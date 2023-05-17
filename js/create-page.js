$(document).ready(function () {
    //load navbar
    $(function () {
        $("#navbar").load("login.html");
    });

    // Add answer btn
    $(document).on('click', '.btn-add-answer', function () {
        var answer = $(this).closest('.answer').clone();
        // Clear value in input
        answer.find("input[type='text']").val('');
        $(this).closest('.answer-list').append(answer);
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

        // Create poll obj
        var pollObj = {
            name: String,
            questionList: [],
            status: true
        };

    // Add the new poll to the polls array
    polls.push(newPoll);

    // Save the updated polls array to local storage
    localStorage.setItem('polls', JSON.stringify(polls));

    // Reset the form
    $('form')[0].reset();

        // Question loop
        var $questionList = $('.question');
        $questionList.each(function () {
            // Create questionObj
            var questionObj = {
                questionContent: String,
                answerList: []
            };

    // Redirect to the list page
    window.location.href = 'list-page.html';

            // LOOP: answer
            var $answerList = $(this).find('.answer-field >.answer-list > .answer');
            $answerList.each(function () {

                // Create answer obj
                var answerObj = {
                    answerContent: String,
                    status: Boolean
                };

    });

                // Add answerObj to questionObj
                questionObj.answerList.push(answerObj);
            });

            // Add questionObj to pollObj
            pollObj.questionList.push(questionObj);
        });

        // get listItem from localStorage
        var itemList = localStorage.getItem('itemList');
        var item = null;

        // listItems is null
        if (!itemList) {
            alert('Please login');
        } else {
            // Convert listItem to array
            itemList = JSON.parse(itemList);

            // Find the user login
            item = itemList.filter(index => {
                return index.user.isLogin === true;
            });

            // Push pollObj to item
            item.pollList.push(pollObj);

            itemList = JSON.stringify(itemList);
            localStorage.setItem('itemList', itemList);

            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:5500/',
                success: function (resp) {
                    window.location.href = 'home-page.html';
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });
});