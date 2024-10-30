let jsPsych = initJsPsych();

let timeline = [];


// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='welcome'> Welcome to this experiment.</h1> 
    <p>This experiment is a demo of the animation plugin. Specifically, you will be asked to categorize a series of faces based on their trustworthiness</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

let neutralPics = ["NeutralA.png", "NeutralB.png"]
let trustworthyPics = ["TrustworhtyA.png", "TrustworthyB.png"]
let untrustworthyPics = ["UntrustworthyA.png", "UntrustworthyB.png"]

// Animation Trial A 
let animationTrialA = {
    type: jsPsychAnimation,
    stimuli: neutralPics,
    sequence_reps: 3,
    frame_time: 500,
    prompt: '<p>Watch the faces.</p>',
};

timeline.push(animationTrialA);

let responseTrialA = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>After viewing these faces, what word would you use to categorize them out of the following: Trustworthy, Neutral, Untrustworthy ?</p>',
    html: `<p><input type='text' name='category' id='mood'></p>`,
    autofocus: 'category',
    button_label: 'Submit Answer',
    data: {
        collect: true,
    },
    on_finish: function (data) {
        data.category = data.response.category1;
    }
}
timeline.push(responseTrialA);

// Animation Trial B

let animationTrialB = {
    type: jsPsychAnimation,
    stimuli: trustworthyPics,
    sequence_reps: 3,
    frame_time: 500,
    prompt: '<p>Watch the faces.</p>',
};

timeline.push(animationTrialB);

let responseTrialB = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>After viewing these faces, what word would you use to categorize them out of the following: Trustworthy, Neutral, Untrustworthy ?</p>',
    html: `<p><input type='text' name='category' id='mood'></p>`,
    autofocus: 'category',
    button_label: 'Submit Answer',
    data: {
        collect: true,
    },
    on_finish: function (data) {
        data.category = data.response.category1;
    }
}
timeline.push(responseTrialB);


// Animation Trial C

let animationTrialC = {
    type: jsPsychAnimation,
    stimuli: untrustworthyPics,
    sequence_reps: 3,
    frame_time: 500,
    prompt: '<p>Watch the faces.</p>',
};

timeline.push(animationTrialC);

let responseTrialC = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>After viewing these faces, what word would you use to categorize them out of the following: Trustworthy, Neutral, Untrustworthy ?</p>',
    html: `<p><input type='text' name='category' id='mood'></p>`,
    autofocus: 'category',
    button_label: 'Submit Answer',
    data: {
        collect: true,
    },
    on_finish: function (data) {
        data.category = data.response.category1;
    }
}
timeline.push(responseTrialC);

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'c4Dswx1nj5mF';
        let forceOSFSave = false;
        let participantId = getCurrentTimestamp();
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
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
    choices: [' '],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}

timeline.push(debriefTrial);

jsPsych.run(timeline)