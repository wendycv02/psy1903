let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='expTitle'>Welcome to the Math Response Time Task!</h1> 
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>There are three parts to this experiment; the questions will increase in difficulty with each part.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);



// Questionairre 

let likertScale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

let questionairre = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "1. I enjoy solving math problems.", labels: likertScale },
        { prompt: "2. I find math easy.", labels: likertScale },
    ],
    randomize_question_order: false
};

timeline.push(questionairre);

// Condition 
for (let block of conditions) {
    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1>${block.title}</h1>
        <p>Press space to begin.</p>
        `,
        choices: [' '],
    };
    timeline.push(blockIntroTrial);

    blockConditions = jsPsych.randomization.repeat(block.questions, 1);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<p>What is <span class='equation'><span class='num1'>${condition.num1}</span> + <span class='num2'>${condition.num2}</span></span>?</p>`,
            html: `<p><input type="text" id="userResponse" name="userResponse" size="10" /></p>`,
            autofocus: 'userResponse',
            button_label: 'Submit Answer',
            data: {
                collect: true,
                block: block.title,
                num1: condition.num1,
                num2: condition.num2,
                answer: condition.answer,
            },
            on_finish: function (data) {
                data.userResponse = data.response.userResponse;
                if (data.userResponse == condition.answer) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
}

// Debrief 
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab.</p>
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

jsPsych.run(timeline)

