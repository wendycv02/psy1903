let jsPsych = initJsPsych();

let timeline = [];


// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='welcome'> Welcome to this experiment.</h1> 
    <p>This experiment is a [insert plugin] demo.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

jsPsych.run(timeline)