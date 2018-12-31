const questions = [
  {
    question:
      "On what floor of the J. Edgar Hoover FBI Building is Mulder's office?",
    answers: {
      a: 'The first floor',
      b: 'The basement',
      c: 'The top floor'
    },
    correctAnswer: 'b'
  },
  {
    question: "What is Mulder's sister's name?",
    answers: {
      a: 'Amanda',
      b: 'Stepahnie',
      c: 'Samantha'
    },
    correctAnswer: 'c'
  },
  {
    question:
      "What item does Scully give to Emily Sim in the episode 'A Christmas Carol'?",
    answers: {
      a: 'A teddy bear',
      b: 'Her cross necklace',
      c: 'Her baby blanket'
    },
    correctAnswer: 'b'
  },
  {
    question: 'How old was Mulder when his sister was abducted?',
    answers: {
      a: '16',
      b: '11',
      c: '12'
    },
    correctAnswer: 'c'
  },
  {
    question:
      'What was the name of the group that made a deal with the aliens to colonize the planet?',
    answers: {
      a: 'The Syndicate',
      b: 'The Colloquium',
      c: 'The Triumvarate'
    },
    correctAnswer: 'a'
  }
];
const quizContainer = $('#quiz');
const submitButton = $('#submit');
const timerElem = $('.timer');
var userAnswers = [];
var rightAnswers;
var wrongAnswers;
var unAnswered;
var timeLeft;
var timer;

var game = {
  rightAnswers: 0,
  wrongAnswers: 0,
  timeLeft: 180,

  countdown: () => {
    timeLeft--;
    timerElem.html(`You have ${game.counter} seconds remaining`);
    if (game.counter === 0) {
      console.log('Time up!');
      console.log(questions[i].answers);
      game.done();
    }
  },
  start: () => {
    const output = [];
    timer = setInterval(game.countdown, 1000);

    questions.forEach((currentQuestion, questionNumber) => {
      const answers = [];
      for (letter in currentQuestion.answers) {
        answers.push(
          `<label for="${questionNumber}-${letter}">
          <input type = "radio" id="${questionNumber}-${letter}" class = "buttons" name="question${questionNumber}" value="${letter}"/>
          <span>${letter}: ${currentQuestion.answers[letter]}
          </span>
          </label>
          <br>`
        );
      }
      output.push(
        `<div class="question">${currentQuestion.question}</div>
        <br>
        <div class="answers">
        <form class="myForm"> ${answers.join('')} </form>
        </div>
        <br>`
      );
    });
    quizContainer.html(
      `<form class = "myForm">${output.join(
        ''
      )}</form><br><input type="submit" id="submit">`
    );
  },
  done: function() {
    clearTimeout(timer);

    $.each($(`input[name='question0']:checked`), function() {
      if ($(this).val() === questions[0].correctAnswer) {
        rightAnswers++;
      } else {
        wrongAnswers++;
      }
    });
    $.each($(`input[name='question1']:checked`), function() {
      if ($(this).val() === questions[1].correctAnswer) {
        rightAnswers++;
      } else {
        wrongAnswers++;
      }
    });
    $.each($(`input[name='question2']:checked`), function() {
      if ($(this).val() === questions[2].correctAnswer) {
        rightAnswers++;
      } else {
        wrongAnswers++;
      }
    });
    $.each($(`input[name='question3']:checked`), function() {
      if ($(this).val() === questions[3].correctAnswer) {
        rightAnswers++;
      } else {
        wrongAnswers++;
      }
    });
    $.each($(`input[name='question4']:checked`), function() {
      if ($(this).val() === questions[4].correctAnswer) {
        rightAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    console.log(this.done);
    this.result();
  },
  result: function() {
    $('.timer').empty();
    $('#quiz').html(`
      <div class = "wins">Right Answers: ${rightAnswers}</div>
      <div class = "losses">Wrong Answers: ${wrongAnswers}</div>
      <div class = "unanswered">Unanswered: ${unAnswered}</div>
      <br>
      <input type="reset" id="again">
      `);
  }
};

$(document).on('click', '#start', function() {
  console.log(game);
  game.start();
});

$(document).on('click', '#submit', function() {
  game.done();
});

$(document).on('click', '#reset', function() {
  game.start();
});
