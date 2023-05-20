$(function () {
    $("#navbarLogin").load("login.html");
});



$(document).ready(function () {

// Retrieve the itemList from localStorage
var storedItemList = localStorage.getItem('itemList');
var itemList = JSON.parse(storedItemList);
// Generate table rows for each poll

var tableRows = '';
itemList.forEach(function (item) {
    var pollList = item.item.pollList;
    var user = item.item.user; // Retrieve the user object
    pollList.forEach(function (poll, index) {
        var pollStatus = poll.status || 'Active';
        var userName = user.name; // Retrieve the user's name
        tableRows += '<tr>';
        tableRows += '<th scope="row">' + (index + 1) + '</th>';
        tableRows += '<td>' + poll.name + '<span class="badge badge-primary ml-2 poll-status">' + pollStatus + '</span>' + '<br style="border-top: 1px solid #000;"> <hr> <b>Created by</b>: ' +'<span class="badge badge-danger ml-2">' + userName + '</span>' + '</td>';        tableRows += '<td>';
<<<<<<< HEAD
        tableRows += '<div class="btn-group mr-2" role="group">';
        tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-primary">View Poll</button>';
=======
        tableRows += '<div class="btn-group mr-2 text-center" role="group">';
        tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;">View Poll</button>';
>>>>>>> master
        if (pollStatus === 'Active') {
            tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-dark btn-close-poll">Close Poll</button>';
        } else if (pollStatus === 'Closed') {
            tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn-open-poll">Open Poll</button>';
        }
        tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-danger btn-delete-poll">Delete</button>';
        tableRows += '</div>';
        tableRows += '</td>';
        tableRows += '</tr>';
    });
});

// Append the table rows to the table body
$('#polls-list').html(tableRows);

    // Handle Close Poll button click

    $('.btn-close-poll').on('click', function () {
        var row = $(this).closest('tr');
        var pollStatusBadge = row.find('.poll-status');
        var pollStatus = pollStatusBadge.text();
    
        if (pollStatus === 'Active') {
            pollStatusBadge.text('Closed');
            pollStatusBadge.addClass('badge-secondary'); // Add the badge-secondary class
            $(this).text('Open Poll');
        } else if (pollStatus === 'Closed') {
            pollStatusBadge.text('Active');
            pollStatusBadge.removeClass('badge-secondary'); // Remove the badge-secondary class
            $(this).text('Close Poll');
        }
    });


    
// Handle Delete Poll button click
$('.btn-delete-poll').on('click', function () {
    var row = $(this).closest('tr');
    var rowIndex = row.index();
    
    // Find the user's poll list
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);
<<<<<<< HEAD
    var userPollList = itemList[0].item.pollList; // Assuming you want to delete from the first user's poll list
    
    // Remove the poll at the rowIndex from the user's poll list
    userPollList.splice(rowIndex, 1);
    
    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
    
    // Remove the table row from the DOM
    row.remove();
});

=======
    
    // Iterate over each user in the itemList
    for (var i = 0; i < itemList.length; i++) {
        var userPollList = itemList[i].item.pollList;
        
        // Check if the rowIndex is within the range of the user's poll list
        if (rowIndex < userPollList.length) {
            // Remove the poll at the rowIndex from the user's poll list
            userPollList.splice(rowIndex, 1);
            
            // Update the itemList in localStorage
            localStorage.setItem('itemList', JSON.stringify(itemList));
            
            // Remove the table row from the DOM
            row.remove();
            
            // Exit the loop once the poll is deleted
            break;
        } else {
            // Adjust the rowIndex to account for the polls in other users' poll lists
            rowIndex -= userPollList.length;
        }
    }
});


>>>>>>> master

    // get Item from localStorage
    var itemList = localStorage.getItem('itemList');
    // convert String to Array
    itemList = JSON.parse(itemList);
    //find the active account
    item ={
       user: {
           name: String,
           password: String,
           isLogin: Boolean,
       },
       polls:[],
    }

    var pollObj={
       name: String,
       questionList: [],
       status : 'active',
    };
   var questionObj={
       questionContent: String,
       answerList:[],
   }
   // duyet acc de check tai khoan login de lay du lieu trong do ra 
   var itemList = localStorage.getItem('itemList');
   var item;
   for(let i = 0; i< itemList.length; i++) {
       let isLogin = itemList[i].user.isLogin;
       if(isLogin) {
           item = itemList[i];
           break;
       }
   }

// Handle filter button click
$('.filter-button').on('click', function () {
    // Get the status associated with the clicked button
    var filterStatus = $(this).data('status');

    // Hide all table rows initially
    $('#polls-list tbody tr').hide();

    // Show the table rows with the matching status
    $('#polls-list tbody tr').each(function () {
        var pollStatusBadge = $(this).find('.poll-status');
        var pollStatus = pollStatusBadge.text();

        if (pollStatus === filterStatus) {
            $(this).show();
        }
    });
});

// Show all table rows when the page is loaded
$('.filter-button[data-status="Active"]').click();



});
<<<<<<< HEAD
=======

>>>>>>> master
