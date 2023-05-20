$(document).ready(function () {
    $(function () {
        $("#navbarLogin").load("login.html");
    });
    event.preventDefault();
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
                let isCheck = answer.status;

                let $answerList = $('<div>').attr('class', 'answer-list');
                let $answer = $('<div>').attr('class', 'answer')

                let $answerLabel = $("<label>").attr("class", "ml-2").text(answer.answerContent)

                $question.append($answerList);
                $answerList.append($answer);

                if (isCheck) {
                    $answer.append($(`<input type="checkbox" checked="checked" disabled/>`));
                } else {
                    $answer.append($(`<input type="checkbox" disabled/>`));
                }
                $answer.append($answerLabel);


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