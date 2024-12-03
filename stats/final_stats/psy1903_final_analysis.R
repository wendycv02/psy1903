#### Load Packages & Set Working Directory ------

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")
library(ggplot2)
library(jsonlite)

setwd("~/Desktop/psy1903/stats/final_stats")

#### D-score Function --------------------------------

calculate_IAT_dscore <- function (data) {
  # Filter out trials and subset full data frame into a tmp file
  tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == TRUE,] 
  # Separate congruent and incongruent trials
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "healthy or fit" |
                            tmp$expectedCategoryAsDisplayed == "unhealthy or fat",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "healthy or fat" |
                              tmp$expectedCategoryAsDisplayed == "unhealthy or fit",]
  # Calculate mean for congruent and mean for incongruent trials 
  congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_means <- mean(incongruent_trials$rt, na.rm = TRUE)
  # Calculate standard deviation for all trials (pooled_sd) 
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  # Calculate D-score
  dscore <- (incongruent_means - congruent_means) / pooled_sd
  # Step 7: Return D-score
  return(dscore)
}

#### Questionnaire Scoring Function ---------------


score_questionnaire <- function (data) {
  ## Extract questionnaire data cell
  json_data <- data[data$trialType == "questionnairePartA", "response"]
  ## Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(json_data)
  questionnaire <- as.data.frame(questionnaire)
  ## Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  ## Reverse score if necessary
  rev_items <- c("Q0", "Q4", "Q5", "Q9")
  for (rev_item in rev_items) {
    questionnaire[, rev_item] <- 4 - questionnaire[, rev_item]
  }
  ## Calculate & return questionnaire score (mean)
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}


#### For Loop ------------------------------------------


## Set a variable with the path to the location of data csv files.
directory_path <- "~/Desktop/psy1903/osfstorage-archive "

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame that has two columns and as many rows as you have data files
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

## Rename default columns 
colnames(dScores) <- c("participant_ID", "d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Initiate a for loop that iterates across each file in files_list
for (file in files_list) {
  # Read file as a tmp
  tmp <- read.csv(file)
  tmp[tmp == ""] <- NA
  # Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  #   “rt” column is numeric
  tmp$rt <- as.numeric(tmp$rt)
  # “correct” column is logical
  tmp$correct <- as.logical(tmp$correct)
  # Appropriate columns are factors
  columnNames <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")
  for (columnName in columnNames) {
    tmp[,columnName] <- as.factor(tmp[,columnName])
  }
  # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  # Assign the dScores "whichPrime" column to be the current participant's prime label. 
  dScores[i, "whichPrime"] <- tmp$displayedVideo[tmp$trialType == "prime" & tmp$displayedVideo != ""]
  # Isolate the d_score for the current row number (i) and assign it to be the current d-score(s) 
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  # Assign the "questionnaire" column as the output of the score_questionnaire function.
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  # Remove tmp
  rm(tmp)
  # Increase i by one for the next iteration
  i <- i + 1
}

# Convert whichPrime into a factor
dScores$whichPrime <- as.factor(dScores$whichPrime)

## Save the new dScores data frame into data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)


#### ANOVA -------------------------------------------

anova_output <- aov(d_score ~ whichPrime, data = dScores)
summary(anova_output)

#### T-Test ---------------------------------------------

TukeyHSD(anova_output)

#### Correlation ---------------------------------------

cor.test(dScores$d_score, dScores$questionnaire)

#### Base R Histogram -------------------------------

# Save Hist as png 
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig1_baseR_histogram.png")

# Create hist
hist(dScores$d_score, xlab = "D-Scores", main = "Distribution of D-Scores")

# Close file 
dev.off()

#### ggplot Histogram --------------------------------

# Save Hist as png 
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig2_ggplot_histogram.png")

# Create hist
ggplot(data = dScores, aes(x = d_score)) + 
  geom_histogram(fill = "skyblue", col = "black", binwidth = 0.15) + 
  labs(title = "Distribution of D-Scores", x = "D-Scores", y = "Frequency") + 
  theme_minimal()

# Close file 
dev.off()

#### ggplot Histogram by Prime ---------------------

# Save Hist as png 
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig3_ggplot_histogram_by_prime.png")

# Create hist
ggplot(data = dScores, aes(x = d_score)) + 
  geom_histogram(fill = "skyblue", col = "black", binwidth = 0.15) + 
  labs(title = "Distribution of D-Scores", x = "D-Scores", y = "Frequency") + 
  facet_wrap(~whichPrime) + 
  theme_classic()

# Close file 
dev.off()

#### ggplot Box Plot ----------------------------------

# Save plot as png 
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig4_ggplot_boxplot.png")

# Create plot 
ggplot(data = dScores, aes(x = whichPrime, y = d_score)) +
  geom_boxplot(aes(color = whichPrime)) + 
  labs(title = "Effect of Prime on D-Scores", x = "Prime Condition", y = "D-Scores") +
  theme_classic() +
  theme(legend.position = "none") +
  scale_x_discrete(
    labels = c("video1" = "Healthy Video", 
               "video2" = "Unhealthy Video"
    )
  )

# Close file 
dev.off()

#### ggplot Scatter Plot -------------------------------

# Save plot as png 
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig5_ggplot_scatter.png")

# Create plot 
ggplot(data = dScores, aes(x = questionnaire, y = d_score)) +
  geom_point() +
  geom_smooth(method = lm) +
  labs(title = "Correlation Between Questionnaire and D-Scores", x = "Questionnaire", y = "D-Scores") +
  theme_classic() 

# Close file 
dev.off()

#### ggplot Custom Theme ---------------------------

# Save plot as png 
png("~/Desktop/psy1903/stats/data_cleaning/output/Fig6_custom_theme.png")

# Create plot 
ggplot(data = dScores, aes(x = whichPrime, y = d_score)) +
  geom_boxplot(aes(fill = whichPrime), notch = TRUE) + 
  scale_fill_manual(values=c("#4FA64A", "#E69F00")) +
  labs(title = "Effect of Prime on D-Scores", x = "Prime Condition", y = "D-Scores") +
  theme(legend.position = "none") +
  scale_x_discrete(labels = c("video1" = "Healthy Video", "video2" = "Unhealthy Video")) +
  theme(
    legend.position = "none",
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5), 
    axis.title = element_text(size = 12),  
    axis.text = element_text(size = 10),   
    panel.grid.major = element_line(color = "gray90")
  ) 

# Close file 
dev.off()
