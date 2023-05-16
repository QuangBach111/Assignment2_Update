
function login(e) {
    event.preventDefault();
    var username = document.getElementById('alias').value;
    var password = document.getElementById('password').value;

    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    
    // check những điều kiện khi đăng nhập
    // 1. User không tồn tại
    if (user == null) {
        alert("User doesn't be existed in the server");
    }
    // 2. User tồn tại đăng nhập thành công
    else if (username == data.username && password == data.password) {
        jQuery.noConflict();
        $('#exampleModal').modal('toggle');
        alert("Login successfully!");

        $(document).ready(function () { // function click nút login thành công
            $("#btnLogin").hide();
            $("#btnLogout").show();
            $("#info").append(username);
        });

        data.isLogin = true;
        localStorage.setItem(username, JSON.stringify(data));

    }
    // 3. Tên username hoặc password không chính xác
    else if (username != data.username || password != data.password) {
        alert("User name or password is not correct.");
    }
    // function click nút logout 
    $(document).ready(function () {
        $("#btnLogout").click(function () {
            $("#btnLogin").show();
            $("#btnLogout").hide();
            window.location.href = "create-page.html";
        });

        data.isLogin = false;
        localStorage.setItem(username, JSON.stringify(data));
    });


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