function login(e) {
    event.preventDefault();
    var username = document.getElementById('alias').value;
    var password = document.getElementById('password').value;

    // var itemList = localStorage.getItem(username);
    // var item = JSON.parse(itemList);

    // Validate login
    // 1. User doesn't be existed
    // if (itemList == null) {
    //     alert("User doesn't be existed in the server");
    // }
    // 2. Existing user login successfully
    // else if (username == item.user.name && password == item.user.password) {
    //     jQuery.noConflict();
    //     $('#exampleModal').modal('toggle');
    //     alert("Login successfully!");

    //     $(document).ready(function () { // function click nút login thành công
    //         $("#btnLogin").hide();
    //         $("#btnLogout").show();
    //         $("#info").append(username);
    //     });

    //     item.user.isLogin = true;
    //     // localStorage.setItem('itemList', JSON.stringify(item));
    //     localStorage.setItem(username, JSON.stringify(item));
    // }
    // 3. Username or password wrong
    // else if (username != item.user.name || password != item.user.password) {
    //     alert("User name or password is not correct.");
    // }

    // Khai báo mảng listItem
    let list = new Array();
    list = JSON.parse(localStorage.getItem("itemList"))?JSON.parse(localStorage.getItem("itemList")):[]

    // Vòng lặp for để kiểm tra điều kiện từng phần tử trong mảng
    for(var i = 0; i < list.length; i++) {
        if (username == list[i].item.user.name) {
            if (password == list[i].item.user.password) {
                alert("Login successfully!");
                jQuery.noConflict();
                $('#exampleModal').modal('toggle');
        
                $(document).ready(function () { // function click nút login thành công
                    $("#btnLogin").hide();
                    $("#btnLogout").show();
                    $("#info").text(" " + username + " ");
                });

                list[i].item.user.isLogin = true; // trả isLogin = true
                localStorage.setItem('itemList', JSON.stringify(list));
            } else {
                alert("Your password is not correct!");
            }
        }
    }

    $(document).ready(function () { // function click nút logout trả isLogin = false
        $("#btnLogout").click(function () {
            for(var i = 0; i < list.length; i++) {
                if(username == list[i].item.user.name && password == list[i].item.user.password) {
                    $("#btnLogin").show();
                    $("#btnLogout").hide();
                    list[i].item.user.isLogin = false;
                    localStorage.setItem('itemList', JSON.stringify(list));
                }
            }
        });
    });
}


// function click nút logout 
// $(document).ready(function () {
//     $("#btnLogout").click(function () {
//         var username = document.getElementById('alias').value;
//         var itemList = localStorage.getItem(username);
//         var item = JSON.parse(itemList);
//         $("#btnLogin").show();
//         $("#btnLogout").hide();
//         item.user.isLogin = false;
//         localStorage.setItem(username, JSON.stringify(item));
//         window.location.href = "create-page.html";
//     });
// });