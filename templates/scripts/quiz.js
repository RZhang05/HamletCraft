(function () {
  var questions = [{
    question: "There are some personal questions in this quiz. Please press Continue to start.",
    choices: ["Continue"],
    correctAnswer: 0
  }, {
    question: "Do you know what problems your partner is currently facing?",
    choices: ["Yes", "No"],
    correctAnswer: 0
  }, {
    question: "Do you discuss life-changing decisions before making them?",
    choices: ["Yes", "No"],
    correctAnswer: 4
  }, {
    question: "Is your relationship completely truthful?",
    choices: ["Yes", "No"],
    correctAnswer: 0
  }, {
    question: "Are there any issues which you have been unable to resolve? ",
    choices: ["Yes", "No"],
    correctAnswer: 3
  }, {
    question: "Were there any societal influences preventing your relationship?",
    choices: ["Yes", "No"],
    correctAnswer: 4
  }, {
    question: "Is there a significant age difference between you and your partner? ",
    choices: ["Yes", "No"],
    correctAnswer: 4
  }, {
    question: "Do you feel as though there are unfair expectations placed upon you?",
    choices: ["Yes", "No"],
    correctAnswer: 4
  }, {
    question: "Do your parents approve of your relationship?",
    choices: ["Yes", "No"],
    correctAnswer: 4
  }, {
    question: "Do you have fond memories of when you first met your partner?",
    choices: ["Yes", "No"],
    correctAnswer: 4
  }];

  var imgs = ['https://media1.giphy.com/media/4bi9ZFzHhroNrFmSsi/source.gif',
    'https://media1.giphy.com/media/RZQIIUO9qrTRC/giphy.gif',
    'https://media1.giphy.com/media/qVIFKTIYcF06k/source.gif',
    'https://thumbs.gfycat.com/PrestigiousNervousEft-size_restricted.gif',
    'https://media0.giphy.com/media/alKwObEvul2cU/source.gif',
    'https://i.makeagif.com/media/4-25-2014/TOrg75.gif',
    'https://media2.giphy.com/media/VnDeUDZ87G8Ny/source.gif',
    'https://thumbs.gfycat.com/RingedCleanImperialeagle-size_restricted.gif',
    'https://66.media.tumblr.com/49505b43cc546e7abb4720af094072cc/tumblr_inline_oa9jfgkfF21tlyhz2_500.gifv',
    'https://media.giphy.com/media/xN0dtLv8skYMg/giphy.gif'];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var img = $('<img src=\"' + imgs[index] + '\"style=\"width:auto;height:150px;\">');
    qElement.append(img);

    var header = $('<h2>Question ' + (index) + ':</h2>');
    if (index == 0) header = $('<h2>Welcome to the Quiz!</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function () {
      $('#question').remove();
      $('.wrapper').remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {

          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var pyro = $('<div>', { class: 'wrapper' });
        var title = $('<h2>You finished the quiz!</h2>');
        quiz.append(title);
        quiz.append(pyro);
        for (var i = 0; i < 250; i++) {
          create(i);
        }
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>', { id: 'question' });

    var hamlethoratio = 0;
    var hamletgertrude = 0;
    var hamletophelia = 0;

    //Caring
    if (selections[1] == 0) hamlethoratio++;
    else hamletgertrude++;

    //Trust
    if (selections[2] == 0) hamlethoratio++;

    //Loyalty
    if (selections[3] == 0) hamlethoratio++;

    //Conflictual
    if (selections[4] == 0) {
      hamletgertrude++;
      hamletophelia++;
    } else hamlethoratio++;

    //Forbidden Love
    if (selections[5] == 0) hamletgertrude++;

    //Familial Love
    if (selections[6] == 0) hamletgertrude++;

    //Unrealistic Expecations
    if (selections[7] == 0) hamletophelia++;

    //disapproving parents
    if (selections[8] == 0) hamletophelia++;

    //innocent relationship
    if (selections[9] == 0) {
      hamlethoratio++;
      hamletophelia++;
    }

    /*
    for (var i = 1; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }*/

    var maxi = Math.max(hamletgertrude, hamlethoratio, hamletophelia);
    if (maxi == hamletgertrude) score.append('Your relationship is similar to that of Hamlet and Gertrude!');
    else if (maxi == hamletophelia) score.append('Your relationship is similar to that of Hamlet and Ophelia!');
    else score.append('Your relationship is similar to that of Hamlet and Horatio!')
    return score;
  }
})();

function create(i) {
  var width = Math.random() * 8;
  var height = width * 0.4;
  var colourIdx = Math.ceil(Math.random() * 3);
  var colour = "red";
  switch (colourIdx) {
    case 1:
      colour = "yellow";
      break;
    case 2:
      colour = "blue";
      break;
    default:
      colour = "red";
  }
  $('<div class="confetti-' + i + ' ' + colour + '"></div>').css({
    "width": width + "px",
    "height": height + "px",
    "top": -Math.random() * 20 + "%",
    "left": Math.random() * 100 + "%",
    "opacity": Math.random() + 0.5,
    "transform": "rotate(" + Math.random() * 360 + "deg)"
  }).appendTo('.wrapper');

  drop(i);
}

function drop(x) {
  $('.confetti-' + x).animate({
    top: "100%",
    left: "+=" + Math.random() * 15 + "%"
  }, Math.random() * 3000 + 3000, function () {
    //reset(x);
  });
}

function reset(x) {
  $('.confetti-' + x).animate({
    "top": -Math.random() * 20 + "%",
    "left": "-=" + Math.random() * 15 + "%"
  }, 0, function () {
    drop(x);
  });
}