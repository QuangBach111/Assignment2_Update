function register(e) {
  event.preventDefault();
  // khai báo những biến của user
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("repassword").value;
  var isLogin = false;

  //Tạo object item 
    var item = {
        user: {
            name: username,
            password: password,
            isLogin: isLogin,
        },
        pollList:[],
    }
    
  // var user = {
  //   username: username,
  //   email: email,
  //   password: password,
  //   repassword: password,
  //   isLogin: false, 
  // };


  // Check điều kiện khi user đăng kí
  // 1. 4 dòng thông tin đều trống
  if (username == "" || email == "" || password == "" || confirmPassword == "") {
    alert("All fields are required. Please complete the form.");
    return false;
  }
  // 2. Điều kiện email 
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  // 3. Điều kiện password và repasword không trùng khớp nhau
  if (password != confirmPassword) {
    alert("Password and re-password fields do not match.");
    return false;
  // 4. Đăng kí thành công 
  } else {

      var json = JSON.stringify(item);
      localStorage.setItem(username, json);
      alert("Register successfully!");
      window.location.href = "create-page.html";
  } 
}