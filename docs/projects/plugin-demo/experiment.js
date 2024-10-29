let jsPsych = initJsPsych();

let timeline = [];


// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='welcome'> Welcome to this experiment.</h1> 
    <p>This experiment is a [insert plugin] demo. You will be asked to categorize a series of faces on a trustworthiness dimension</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

let images = ["NeutralA.png", "NeutralB.png", "TrustworhtyA.png", "TrustworthyB.png", "UntrustworthyA.png", "UntrustworthyB.png"];

let animationTrial = {
    type: jsPsychAnimation,
    stimuli: images,
    sequence_reps: 3,
    frame_time: 300,
    prompt: '<p>Watch the faces.</p>',
};

timeline.push(animationTrial);
jsPsych.run(timeline)