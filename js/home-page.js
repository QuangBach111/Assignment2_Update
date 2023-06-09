$(document).ready(function () {
    $(function () {
        $("#navbar").load("login.html");
    });

    // get itemList
    let itemList = getDataFromLocalStorage();

    // Find user login
    let item = findUserLogin(itemList);

    if (item) {
        let $listContainer = $('#listContainer');
        let pollList = item.item.pollList;

        //     Find poll active
        let pollActive = findPollActive(pollList);
        console.log(pollActive);

        // poll name
        let pollName = pollActive.name;
        $listContainer.prepend(`<h1 class="text-center">${pollName}</h1>`);

        // questionList
        let questionList = pollActive.questionList;
        questionList.forEach(question => {
            //  question content
            let questionContent = question.questionContent;
            console.log(questionContent);

            let $question = $(`<li class="question">${questionContent}</li>`);

            $('#question-list').append($question);

            //        answer list
            let answerList = question.answerList;

            answerList.forEach(answer => {

                // let $answerDiv = $(`<div class="form-group custom-control custom-radio answer">`)
                // let $answerlabel = ` <label class="custom-control-label" >${answer.answerContent}</label>`;
                // let $input = $(`<input type="checkbox" class="custom-control-input" checked="checked">`);

                let $answerList = $('<div>').attr('class', 'answer-list');
                let $answer = $('<div>').attr('class', 'answer')

                let $answerLabel = $("<label>").attr("class", "ml-2").text(answer.answerContent)

                let $input = $("<input>").attr({'type': 'checkbox', 'value': ' ', 'class': 'checkbox-answer'})

                $question.append($answerList);
                $answerList.append($answer);
                $answer.append($input);
                $answer.append($answerLabel);
            })
        });

        $('#form-homepage').submit(function (e) {
            e.preventDefault()

            console.log($('#question-list'));
            $(this).find($('.question')).each(function (questionIndex, question) {
                $(this).find($('.answer-list')).each(function (answerIndex, answer) {
                    let $checkbox = $(this).find($('.checkbox-answer'));

                    let isChecked = $($checkbox).is(":checked");

                    questionList[questionIndex].answerList[answerIndex].status = isChecked;
                })
            });

            localStorage.setItem('itemList', JSON.stringify(itemList));
            $.ajax({
                type: 'GET',
                success: function (result) {
                    window.location.href = 'view-result.html'
                    alert('Retain successfully!"')
                },
                error: function (error) {
                    console.log(error)
                }
            })
        });




    }
});

function findPollActive(pollList) {
    let pollActiveList = null;

    pollActiveList = pollList.find(poll => {
        return poll.isActive === true;
    });

    return pollActiveList;
}