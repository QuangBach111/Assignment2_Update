
function login(e) {
    e.preventDefault();
    var username = document.getElementById('alias').value;
    var password = document.getElementById('password').value;
    let user_records = new Array();
        user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]

    for(var i = 0; i < user_records.length; i++) {
        if (user_records[i] == null) {
            alert("User doesn't be existed in the server");
        }
        else if ((username == user_records[i].username) && (password == user_records[i].password)) {
            alert("Login successfully");
        }
        else if ((username != user_records[i].username) || (password != user_records[i].password)){
            alert("User name or password is not correct.")
        }
        else {
            alert("There is an error occurring during login section.");
        }
    }
}

// $(document).ready(function () {
//
//
//     var userObj = {
//         user: {
//             alias: 'user',
//             password: 'password'
//         },
//         poll: []
//     };
//
//     var pollObj = {
//         question: [],
//         status: 'active' //active, close
//     }
//     pollObject.question.push(question1);
//
//     var questionObj =  {
//         answer: []
//     }
//
//     var answerObj = {
//         answerContent: '',
//         result: true
//     };
//
//     // 1 questio - > nhiều answer
//     questionObj.answer.push(answerObj);
//
//     // 1 poll -> có nhiều question
//     pollObj.question.push(questionObj);
//
//     //     User có nhiều poll
//     userObj.poll.push(pollObj);
//
//     //ListItem trong storage lưu được nhiều user
//     var listItems = localStorage.getItem('listItems'); // get JSON string
//
//     listItems = JSON.parse(listItems); //Convert into array
//
//     listItems.push(userObj); //push userObj
// })