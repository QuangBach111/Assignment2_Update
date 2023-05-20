$(function() {
    $("#navbar").load("login.html");
});

$(document).ready(function() {

var itemList= localStorage.getItem('itemList');
if(itemList) {
   itemList = JSON.parse(itemList);
   console.log(itemList)

 itemList.forEach(function(element) {
    var listContainer = $('#listContainer');
    var userName = element.item.user.name
    var password = element.item.user.password

    var namePollList = element.item.pollList;
 // vong lap lay tat ca name poll, question, answer
for (var i = 0; i < namePollList.length; i++) {
  var poll = namePollList[i].name;
  console.log("Poll name:", poll);

  var questionList = namePollList[i].questionList;
  for (var j = 0; j < questionList.length; j++) {
    var question = questionList[j].questionContent;
    console.log("Question:", question);

    var answerList = questionList[j].answerList;
    for (var k = 0; k < answerList.length; k++) {
      var answerContent = answerList[k].answerContent;
      console.log("Answer:", answerContent); 
    }
  } 
}
//tao the ul
var $ul = $("<ul>").attr("class", "list-unstyled"); 

$.each(namePollList, function(index, poll) {

  //tao the li cho moi poll
  var $li = $("<li>"); 

  var pollName = poll.name;

  //tao the h1 cho ten poll
  var $pollName = $("<h1>").text(pollName); 
 

  $("#listContainer").append($pollName);  

  var questionList = poll.questionList;

  //tao the ol cho danh sach cau hoi
  var $ol = $("<ol>"); 
  $.each(questionList, function(index, question) {

    //tao the li cho moi cau hoi
    var $li = $("<li>").attr('class','')

    var questionContent = question.questionContent; 
    // tao the label cho noi dung cau hoi 
    var $questionLabel = $("<h5>").attr("class","").text(questionContent); 
   
     // them the label vua tao vao thr li
    $li.append($questionLabel); 

    var answerList = question.answerList;

    $.each(answerList, function(index, answer) {
      //tao the div roi apppend label ,input  vo the div
      var $div = $('<div>').attr('class','')
      var answerContent = answer.answerContent;
      var $answerLabel = $("<label>").attr("class","ml-2").text(answerContent)
     
      var $input = $("<input>").attr({'type':'checkbox','value': ' ','class' :''}) 
      
      $li.append($div)
      $div.append($input)
      $div.append($answerLabel)
    });

    $ol.append($li);
  });

  $li.append($ol);
  $ul.append($li);
    
    //tao button retain
  $("#listContainer").append($ul); 
  var button = $('<button type= "submit" class="btn btn-outline-success btn-sm mb-4 mt-2" id = "submitButton">Retain</button>');
  $("#listContainer").append(button);
 
    $('#submitButton').click( function(e) {
       e.preventDefault()
       $.ajax({
         type:'GET',
         url:'view-result.html',
         success: function(result) {

           window.location.href = 'view-result.html'
           alert('Retain successfully!"')
         },
         error: function(error) {
           console.log(error)
         }
       })
    })
});
});
}
  });