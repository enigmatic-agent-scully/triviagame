const questions = [
    {
        question: "On what floor of the J. Edgar Hoover FBI Building is Mulder's office?",
        answers: {
            a: "The first floor",
            b: "The basement",
            c: "The top floor",
        },
        correctAnswer: "b",
    },
    {
        question: "What is Mulder's sister's name?",
        answers: {
            a: "Amanda",
            b: "Stepahnie",
            c: "Samantha",
        },
        correctAnswer: "c",
    },
    {
        question: "What item does Scully give to Emily Sim in the episode 'A Christmas Carol'?",
        answers: {
            a: "A teddy bear",
            b: "Her cross necklace",
            c: "Her baby blanket",
        },
        correctAnswer: "b",
    },
    {
        question: "How old was Mulder when his sister was abducted?",
        answers: {
            a: "16",
            b: "11",
            c: "12",
        },
        correctAnswer: "c",
    },
    {
        question: "What was the name of the group that made a deal with the aliens to colonize the planet?",
        answers: {
            a: "The Syndicate",
            b: "The Colloquium",
            c: "The Triumvarate",
        },
        correctAnswer: "a",
    }
];
const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const timer = document.getElementById("timer");
var userAnswers = [];
var rightAnswers = 0;
var wrongAnswers = 0;
var unAnswered = 0;
var timeLeft = 100000;
var timerId = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft === 0) {
        clearTimeout(timerId);
        scoreQuiz();
    }
    else {
        $(".timer").text(timeLeft + ' secs remaining');
        timeLeft--;
    }
}
countdown();

function displayQuestions() {
    const output = [];
    rightAnswers = 0;
    wrongAnswers = 0;
    unAnswered = 0;

    questions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label for="${questionNumber}.${letter}">
                <input type = "radio" id="${questionNumber}.${letter}" class = "buttons" name="question${questionNumber}" value="${letter}"/>
                <span>
                ${letter}: ${currentQuestion.answers[letter]}
                </span>
                </label>
                <br>`
                )
            }
            output.push(
                `
            <div class="question">${currentQuestion.question}</div>
            <br>
            <div class="answers">
            <form id="myForm"> ${answers.join("")} </form>
            </div>
            <br>
            `
            );
        }
    )
    quizContainer.innerHTML = `<form id = "myForm">${output.join('')}</form><br><input type="submit" id="submit">`;
}
displayQuestions();

$(".buttons").click(function () {

    if (userAnswers.length > 4) {
        alert("You've answered all the questions!")
    }
    else {
        userAnswers.push($(this).val());
        console.log(userAnswers);
    }
})

$("#submit").click(function () {
    scoreQuiz();
});

function scoreQuiz() {
    clearTimeout(timerId);
    userAnswers.forEach(
        (e, index) => {
            if (e === questions[index].correctAnswer) {
                rightAnswers++;

            }
            else if (e != questions[index].correctAnswer) {
                wrongAnswers++;
            }
            else if (e === "") {
                unAnswered++;
            }
        })
    console.log(wrongAnswers);
    console.log(rightAnswers);
    $(".timer").empty();
    $("#quiz").html(`
    <div class = "wins">Right Answers: ${rightAnswers}</div>
    <div class = "losses">Wrong Answers: ${wrongAnswers}</div>
    <div class = "losses">Unanswered: ${unAnswered}</div>
    <br>
    <input type="reset" id="reset">
    `);
};

$("#reset").click(function () {
    displayQuestions();

})

