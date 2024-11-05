let jsPsych = initJsPsych({
    show_progress_bar: true
});

let timeline = [];


// Consent Screen

let consentScreen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Consent Form: </h1> 
    <p>This experiment is an educational exercise about learning to program and analyze a psychological experiment and not a “real” scientific experiment. No identifying information is collected, and data will not be shared beyond our class. If you agree to help out by completing the tasks and questionnaires, please continue. Otherwise, you may close this tab. If you have any questions, please reach out to Dr. Garth Coombs <garthcoombs@fas.harvard.edu>, one of the head instructors of PSY 1903: Programming for Psychological Scientists.</p>
    <p>Press <span class='key'>SPACE</span> to proceed.</p>
    `,
    choices: [' '],
};

timeline.push(consentScreen);

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='welcome'> Welcome to the <span class= 'greengiant'>Green Giant Experiment</span>!</h1> 
    <p>In this experiment, you will complete the following two tasks:</p>
    <div class="task-box">
        <li>In Task 1, you will be asked to watch two short videos.</li>
        <li>In Task 2, you will answer a brief set of questions.</li>
        <li>In Task 3, you will be asked to categorize a series of words.</li>
    </div>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

// Task 1: Priming Task 
let videos = {
    video1: {
        iframe: "<iframe title='YouTube video player' width='640' height='390' src='https://www.youtube.com/embed/XMcab1MFaLc' frameborder='0' allowFullScreen></iframe>",
        label: 'video1'
    },
    video2: {
        iframe: "<iframe title='YouTube video player' width='640' height='390' src='https://www.youtube.com/embed/aOusNCEXFZw' frameborder='0' allowFullScreen></iframe>",
        label: 'video2'
    }
};

let selectedVideo = Math.random() < 0.5 ? videos.video1 : videos.video2;

let primingTask = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Task 1 of 3</h1>
    <p>Please watch the following video. When you are done, press the <span class='key'>SPACE</span> key to move to your next task.</p>
    <p>${selectedVideo.iframe}</p>
    `,
    choices: [' '],
    data: {
        collect: true,
        trialType: 'prime',
        displayedVideo: selectedVideo.label
    }
};

timeline.push(primingTask);

// Task 2: Questionnaire 
let likertScale = [
    "Not at all True of Myself (1)",
    "Slightly True of Myself",
    "About Halfway True of Myself (3)",
    "Mostly True of Myself",
    "Completely True of Myself (5)"
];
let questionnaire = {
    type: jsPsychSurveyLikert,
    preamble: `<h1> Task 2 of 3 </h1>
    <p> Please answer the following items on a scale of 'Not at all True of Myself' (1) to "About Halfway True of Myself" (3) to "Completely True of Myself' (5). </p>
    `,
    questions: [
        { prompt: "I think my body is unattractive.", labels: likertScaleA },
        { prompt: "How well my body is functioning influences the way I feel about my body.", labels: likertScale },
        { prompt: "Having a well-proprtioned body is importatnt to me.", labels: likertScale },
        { prompt: "My overall fitness level is high.", labels: likertScale },
        { prompt: "I compare my body to people I'm close to.", labels: likertScale },
        { prompt: "My naked body makes me feel sad.", labels: likertScale },
        { prompt: "I feel better about my body when I'm fitter.", labels: likertScale },
        { prompt: "My body is healthy.", labels: likertScale },
        { prompt: "My body is in shape.", labels: likertScale },
        { prompt: "My body is overweight.", labels: likertScale },
    ],

    randomize_question_order: false,
    data: {
        collect: true,
        trialType: 'questionnaire'
    }
};


timeline.push(questionnaire);

// Task 3: IAT

// Intro Screen 
let introScreen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Task 3 of 3</h1> 
    <p>In this final task, you will be shown a series of words and asked to sort them into categories.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(introScreen);

let partNumber = 1;

// Trial Blocks 
for (let block of conditions) {

    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    let blockInstructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1>Part ${partNumber++}</h1>
        <p>In this part, the two categories will be: <span class="bold-text">${leftCategory}</span> and <span class="bold-text">${rightCategory}</span>.</p>
        <p>If the word you see in the middle of the screen should be sorted into the <span class="bold-text">${leftCategory}</span>, press the <span class='key'>F</span> key</p>
        <p>If the word should be sorted into the <span class="bold-text">${rightCategory}</span>, press the <span class='key'>J</span> key</p>
        <p>Press <span class='key'>SPACE</span> to begin.</p>
        `,
        choices: [' '],
    };
    timeline.push(blockInstructions);

    for (let trial of block.trials) {

        // Word Trial
        let wordTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <div class="trial-container">
                <div class="categories">
                    <span class="category"><span class="bold-text">${leftCategory}</span> (press F)</span>
                    <span class="category"><span class="bold-text">${rightCategory}</span> (press J)</span>
                </div>
                <div class="word">${trial.word}</div>
            </div>
            `,
            choices: ['f', 'j'],
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory
            },
            on_finish: function (data) {
                if (data.response == trial.expectedResponse) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        };
        timeline.push(wordTrial);

        // Fixation Trial
        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <p><span class="plus-symbol"><span class="bold-text">+</span></span></p>
            `,
            trial_duration: 250,
            stimulus_duration: 250,
            choices: ['NO KEYS']
        };
        timeline.push(fixationTrial);
    }
}


// Results 
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'iat';
        let dataPipeExperimentId = 'c4Dswx1nj5mF';
        let forceOSFSave = true;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

// Debrief 
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>The experiment is now complete, you can close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        jsPsych.progressBar.progress = 1;
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['response', 'stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv()
        console.log(data);
    }
}

timeline.push(debriefTrial);

jsPsych.run(timeline);



