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

    //  Add question btn
    $('#btn-add-question').click(function () {
        var question = $('.question:last').clone();
        question.find("input[type='text']").val('');
        // set at default answer (only one answer)
        question.find('.answer:not(:first-child)').remove();
        $('.question-list').append(question);
    });

    // Submit event
    $('form').submit(function (event) {
        event.preventDefault();

        // Create poll obj
        var pollObj = {
            name: String,
            questionList: [],
            status: true
        };

        // poll name
        pollObj.name = $('.name-poll-input').val();

        // Question loop
        var $questionList = $('.question');
        $questionList.each(function () {
            // Create questionObj
            var questionObj = {
                questionContent: String,
                answerList: []
            };

            // Get question input
            questionObj.questionContent = $(this).find('.question-input').val();
            console.log(`Question: ${questionObj.questionContent}`)

            // LOOP: answer
            var $answerList = $(this).find('.answer-field >.answer-list > .answer');
            $answerList.each(function () {

                // Create answer obj
                var answerObj = {
                    answerContent: String,
                    status: Boolean
                };

                // Get answer content
                answerObj.answerContent = $(this).find('.answer-input').val();
                console.log(`\tanswer:${answerObj.answerContent} `)

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
})