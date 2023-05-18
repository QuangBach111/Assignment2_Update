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
            isActive: true
        };

    // Add the new poll to the polls array
    polls.push(newPoll);

    // Save the updated polls array to local storage
    localStorage.setItem('polls', JSON.stringify(polls));

    // Reset the form
    $('form')[0].reset();

        // Question loop
        $('.question').each(function () {
            // Create questionObj
            var questionObj = {
                questionContent: String,
                answerList: []
            };

            // Get question input
            questionObj.questionContent = $(this).find('.question-input').val();


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


                // Add answerObj to questionObj
                questionObj.answerList.push(answerObj);
            });

            // Add questionObj to pollObj
            pollObj.questionList.push(questionObj);
        });

        // get listItem from localStorage (JSON)
        var itemList = localStorage.getItem('itemList');
        console.log(`itemList String: ${itemList}`);

        // listItems is null, show login page
        if (!itemList) {
            // pop up login modal   
            jQuery.noConflict();
            $('#navbar').find('#exampleModal').modal('show');
        } else {
            // Convert itemList to array
            itemList = JSON.parse(itemList);
            let item = null;
            // Find the user login
            item = itemList.find(currentItem => {
                return currentItem.item.user.isLogin === true;
            });

            // If no login
            if (item === null) {
                // pop up login modal
                $('#navbar').find('#exampleModal').modal('show');
            } else {
                // Push new poll to item
                item.item.pollList.push(pollObj);

                // Convert to string
                itemList = JSON.stringify(itemList);

                // Stored it into localStorage
                localStorage.setItem('itemList', itemList);

                // Redirect: home-page.html
                $.ajax({
                    type: 'GET',
                    success: function (resp) {
                        window.location.href = 'home-page.html';
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }

            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:5501/',
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