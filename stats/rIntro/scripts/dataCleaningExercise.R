#### (1) Set WD ------------
setwd("~/Desktop/psy1903/")

dir.create("stats/data_cleaning/")
dir.create("stats/data_cleaning/output")
dir.create("stats/data_cleaning/scripts")
dir.create("stats/data_cleaning/data")

setwd("~/Desktop/psy1903/stats/data_cleaning/scripts/")

#### (2) Install packages ---------

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")
install.packages("ggplot")
library("ggplot2")

#### (3) Read individual IAT data file --------

iat_data1 <- read.csv("../../../osfstorage-archive/iat-2024-11-08-01-18-12.csv", header = TRUE, na.strings = "NA", stringsAsFactors = FALSE)
str(iat_data1)
summary(iat_data1)

#### (4) Subsetting --------

iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed == "healthy or fat" |
                         iat_data1$expectedCategoryAsDisplayed == "healthy or fit" |
                         iat_data1$expectedCategoryAsDisplayed == "unhealthy or fat" |
                         iat_data1$expectedCategoryAsDisplayed == "unhealthy or fit",
                       c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]


#### (5) Refactoring ------------------

str(iat_data2)
summary(iat_data2)

iat_data2$rt <- round(as.numeric(iat_data2$rt), 0)

column_names <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")

for (column_name in column_names) {
  iat_data2[, column_name] <- as.factor(iat_data2[, column_name])
}

# column_name <- "expectedCategory"
# iat_data2[, column_name]

str(iat_data2)
summary(iat_data2)


#### (6) Creating a function ----------

calculate_IAT_dscore <- function (tmp) {
  # Step 2: Filter out trials with rt < 300 ms (subset full data frame into new data frame called tmp)
  tmp <- iat_data2[iat_data2$rt > 300 & iat_data2$rt < 5000,]
  # Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials) 
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "healthy or fit" |
                            tmp$expectedCategoryAsDisplayed == "unhealthy or fat",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "healthy or fat" |
                              tmp$expectedCategoryAsDisplayed == "unhealthy or fit",]
  # Step 4: Calculate mean for congruent and mean for incongruent trials (mean_congruent, mean_incongruent)
  congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_means <- mean(incongruent_trials$rt, na.rm = TRUE)
  # Step 5: Calculate standard deviation for all trials (pooled_sd) 
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  # Step 6: Calculate D-score
  dscore <- (incongruent_means - congruent_means) / pooled_sd
  # Step 7: Return D-score
  return(dscore)
}

#### (7) For loop and new data files -------

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "~/Desktop/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)
# Print files_list to check that it contains all file paths
print(files_list)

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## IAT
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))
head(dScores)

## Rename the default column names to something meaningful
## IAT
colnames(dScores) <- c("participant_ID", "d_score")
head(dScores)

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Now fill in the remaining code following the commented instructions:

## Initiate a for loop that iterates across each file in files_list

# Set tmp file for testing 
# file <- files_list[[1]]

for (file in files_list) {
  # Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file, header = TRUE, stringsAsFactors = FALSE)
  # Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  # Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
  dScores[i, "d_score"] <- calculate_IAT_dscore()
  # Remove the temporary data file tmp
  rm(tmp)
  # Increase our row number variable i by one for the next iteration
  i <- i + 1
}

View(dScores)

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)


