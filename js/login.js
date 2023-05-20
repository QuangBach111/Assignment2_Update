$(document).ready(function () {
    // load menu
    let list = getDataFromLocalStorage();

    // check whether user is login or not
    let item = findUserLogin(list);

    if (item) {
        let isLogin = item.item.user.isLogin
        //if no user active
        if (!isLogin) {
            $('#navbar').find('#exampleModal').modal('show');
        } else {
            $("#btnLogin").hide();
            $("#btnLogout").show();
            $("#info").text(" " + item.item.user.name + " ");
        }
    } else {
        $('#navbar').find('#exampleModal').modal('show');
    }


    $('#form-login').submit(function (e) {
        e.preventDefault();
        let username = document.getElementById('alias').value;
        let password = document.getElementById('password').value;


        // Vòng lặp for để kiểm tra điều kiện từng phần tử trong mảng
        let flag = 0; // biến cờ
        for (let i = 0; i < list.length; i++) {
            if (username === list[i].item.user.name) {
                flag = 1;
                if (password === list[i].item.user.password) {
                    alert("Login successfully!");
                    $.noConflict();
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
                break;
            }
        }
        // Thông báo user không tồn tại
        if (flag === 0) {
            alert("User doesn't be existed in sever! Please login again..");
            $.ajax({
                type: 'GET',
                success: function (resp) {
                    window.location.href = 'register.html';
                },
                error: function (error) {
                    console.log(error);
                }
            })

        }
        else{
            $.ajax({
                type: 'GET',
                success: function (resp) {
                    window.location.href = 'create-page.html';
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }


    })

    $("#btnLogout").click(function () {
        let itemActive = findUserLogin(list);
        $("#btnLogin").show();
        $("#btnLogout").hide();
        itemActive.item.user.isLogin = false;

        storeDataToLocalStorage(list);
    });
})