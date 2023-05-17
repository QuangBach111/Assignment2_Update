function register(e) {
  event.preventDefault();
  // Declare var elements of user
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("repassword").value;
  var isLogin = false;

  // Createl object item
    var item = {
        user: {
            name: username,
            password: password,
            isLogin: isLogin,
        },
        pollList:[],
    }
    
  // Check validate register
  // 1. User dont't input 4 fields
  if (username == "" || email == "" || password == "" || confirmPassword == "") {
    alert("All fields are required. Please complete the form.");
    return false;
  }
  // 2. Validate email
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  // 3. Validate password and repassword do not match 
  if (password != confirmPassword) {
    alert("Password and re-password fields do not match.");
    return false;
  // 4. Resgister successfully
  } else {

      var json = JSON.stringify(item);
      localStorage.setItem('itemList', json);
      alert("Register successfully!");
      window.location.href = "create-page.html";
  } 
}