let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='welcome'> Welcome to the Green Giant Task!</h1> 
    <p>In this experiment, you will complete the following two tasks:.</p>
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
let likertScaleA = [
    "Strongly Disagree (1)",
    "Disagree",
    "Neutral (3)",
    "Agree",
    "Strongly Agree (5)"
];

let likertScaleB = [
    "Never (1)",
    "Very Rarely",
    "Occasionally (3)",
    "Frequently",
    "Very Frequently (5)"
];

let questionnaireA = {
    type: jsPsychSurveyLikert,
    preamble: '<h1>Task 2 of 3</h1><p>Please answer the following items on a scale of "Strongly Disagree" (1) to "Strongly Agree" (5).</p>',
    questions: [
        { prompt: "How strongly do you feel it is important to have a healthy diet?", labels: likertScaleA },
        { prompt: "How strongly do you believe your food intake impacts your physical appearance and body?", labels: likertScaleA },
        { prompt: "How much do you agree with the following statements: I make healthy choices when eating.", labels: likertScaleA },
        { prompt: "I have a healthy body.", labels: likertScaleA },
        { prompt: "I make unhealthy choices when eating.", labels: likertScaleA },
        { prompt: "I have an unhealthy body.", labels: likertScaleA },
    ],
    randomize_question_order: false,
    data: {
        collect: true,
        trialType: 'questionnairePartA'
    }
};

let questionnaireB = {
    type: jsPsychSurveyLikert,
    preamble: '<h1>Task 2 of 3 (Continued...)</h1><p>Please answer the following items on a scale of "Never" (1) to "Frequently Agree" (5).</p>',
    questions: [
        { prompt: "How often do you think about your diet?", labels: likertScaleB },
        { prompt: "How often do you eat foods with high sugar/fat?", labels: likertScaleB },
        { prompt: "How often do you eat organic foods?.", labels: likertScaleB },
        { prompt: "How often do you overeat past the point of being full?", labels: likertScaleB },
        { prompt: "How often do you have home-cooked meals? ", labels: likertScaleB },
        { prompt: "How often do you eat fast food meals? ", labels: likertScaleB },
    ],
    randomize_question_order: false,
    data: {
        collect: true,
        trialType: 'questionnairePartB'
    }
};

timeline.push(questionnaireA, questionnaireB);

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

        let blockTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <p><span class="bold-text">${leftCategory}</span> (Press F)</p>
            <p><span class="bold-text">${rightCategory}</span> (Press J)</p>
            <p>${trial.word}</p>
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
        timeline.push(blockTrial);
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
        let dataPipeExperimentId = 'your-experiment-id-here';
        let forceOSFSave = false;

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
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['response', 'stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}

timeline.push(debriefTrial);

jsPsych.run(timeline);



