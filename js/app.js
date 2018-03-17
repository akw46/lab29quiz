var questions = [{
    title: "Which of the following diseases is caused by a bacteria?",
    answers: ['Flu','Chickenpox','MRSA','HIV'],
    correct: 2
  },
  {
    title: "What does 'RSV' stand for?",
    answers: ['Respiratory Systemic Virus','Respiratory Syncytial Virus','Really Sick Virus','Rate Some Variables'],
    correct: 1
  },
    {
    title: "The pathogen that causes Mad Cow is a:",
    answers: ['Virus','Bacteria','Toxin','Prion'],
    correct: 3
  },
    {
    title: "What insect carries malaria?",
    answers: ['Flea','Mosquito','Sand Fly','Fly'],
    correct: 1
  }];

var score = 0;
var currentQuestion = 0;

$(document).ready(function(){
  displayQuestion();

  // $('li').click only applied when page loaded--changed to $('ul');
  $('ul').on('click', 'li', function(e){
    $('.selected').removeClass('selected');
    $(e.currentTarget).addClass('selected');
    $('a').addClass('ready');
  });

  $('a').click(function(e){
    e.preventDefault();
    if($(e.currentTarget).hasClass('ready')){
      var guess = $('.selected').attr("id");
      checkAnswer(guess);
    } else if($(e.currentTarget).hasClass('restart')){
      currentQuestion = 0;
      score = 0;
      $(e.currentTarget).removeClass('restart').text('Submit Answer');
      displayQuestion();
    } else {
      alert('You must submit an answer!');
    }
  });

});

function displayQuestion(){
  if(currentQuestion < questions.length) {
    updateScore();
    var question = questions[currentQuestion];
    $('h2').text(question.title);
    $('ul').html('');
    $('.ready').removeClass('ready');
    // i++ increments i by 1; i=i+3;
    for (var i = 0; i < question.answers.length; i++) {
      $('ul').append('<li id="'+i+'">'+question.answers[i]+'</li>');
    }
  } else {
    showSummary();
  }
}

function checkAnswer(guess){
  var question = questions[currentQuestion];
  if(question.correct == guess){
    score++;
  }
  currentQuestion++;
  displayQuestion();
}

function updateScore(){
  $('.questions span').text((currentQuestion+1) + "/" + questions.length);
  $('.score span').text(score);
}

function showSummary(){
  $('ul').html('');
  $('.ready').removeClass('ready').addClass('restart').text('Restart Quiz');
  $('h2').text('Congratulations! You scored ' + (score/questions.length)*100 + '%');
  $('.score span').text(score);
}
