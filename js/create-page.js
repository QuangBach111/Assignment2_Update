$(function () {
    $("#navbar").load("login.html");
});

$(document).ready(function () {

    var $questionItemField = $('#question-item-field-base');
    // Retrieve the existing polls from local storage
    var existingPolls = localStorage.getItem('polls');
    var polls = existingPolls ? JSON.parse(existingPolls) : [];



    $('.btn-add-answer').click(function () {
        // var $newAnswer = $(document).prev('.answer-input-container').find('.answer-input:first').clone(true);
        // $newAnswer.insertAfter($(document).prev('.answer-input-container').find('.answer-input:last'));
        // console.log('aaa')


        $('.answer-input-container').append($newAnswer);
    });


    //    Add question button
    $('#btn-add-question').click(function () {
        $('.question-field').append($questionItemField.clone());
    });

    const addAnswerBtn = document.querySelectorAll('.btn-add-answer');

    addAnswerBtn.forEach(obj => {
        console.log(obj.id);
    })

// Handle form submission
$('form').submit(function (event) {
    event.preventDefault();

    // Get the input values
    var pollName = $('#name-poll').val();
    var question = $('.question-input').val();
    var mandatory = $('#checkMandatory').is(':checked');
    var multipleOptions = $('#checkMultipleOption').is(':checked');
    var answers = $('.answer-input').map(function () {
        return $(this).val();
    }).get();

    // Create a new poll object
    var newPoll = {
        name: pollName,
        question: question,
        mandatory: mandatory,
        multipleOptions: multipleOptions,
        answers: answers
    };

    // Add the new poll to the polls array
    polls.push(newPoll);

    // Save the updated polls array to local storage
    localStorage.setItem('polls', JSON.stringify(polls));

    // Reset the form
    $('form')[0].reset();

    // Optionally display a success message or perform other actions

    // Redirect to the list page
    window.location.href = 'list-page.html';



    });

});



