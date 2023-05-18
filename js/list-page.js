$(function() {
    $("#navbarLogin").load("login.html");
});
$(document).ready(function () {
    // Retrieve the polls from local storage
    var storedPolls = localStorage.getItem('itemList');
    var polls = JSON.parse(storedPolls);

    // Generate table rows for each poll
    var tableRows = '';
    polls.forEach(function (poll, index) {
        var pollStatus = poll.status || 'Active';
        tableRows += '<tr>';
        tableRows += '<th scope="row">' + (index + 1) + '</th>';
        tableRows += '<td>' + poll.item.user.name + '<span class="badge badge-primary ml-2 poll-status">' + pollStatus + '</span></td>';
        tableRows += '<td>';
        tableRows += '<div class="btn-group mr-2" role="group">';
        tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;">View Poll</button>';
        if (pollStatus === 'Active') {
            tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn-close-poll">Close Poll</button>';
        } else if (pollStatus === 'Closed') {
            tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn-open-poll">Open Poll</button>';
        }
        tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn-delete-poll">Delete</button>';
        tableRows += '</div>';
        tableRows += '</td>';
        tableRows += '</tr>';
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
        row.remove();
        polls.splice(rowIndex, 1);
        localStorage.setItem('polls', JSON.stringify(polls));
    });

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