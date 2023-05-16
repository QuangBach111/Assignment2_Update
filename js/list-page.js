$(function () {
    $("#navbarLogin").load("login.html");
});

$(document).ready(function () {
    // Retrieve the polls from local storage
    var storedPolls = localStorage.getItem('polls');
    var polls = storedPolls ? JSON.parse(storedPolls) : [];

    // Generate table rows for each poll
    var tableRows = '';
    polls.forEach(function (poll, index) {
        var pollStatus = poll.status || 'Active';
        tableRows += '<tr>';
        tableRows += '<th scope="row">' + (index + 1) + '</th>';
        tableRows += '<td>' + poll.name + '<span class="badge badge-primary ml-2 poll-status">' + pollStatus + '</span></td>';
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
            $(this).text('Open Poll');
        } else if (pollStatus === 'Closed') {
            pollStatusBadge.text('Active');
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
});

// get Item from localStorage
     var itemList = localStorage.getItem('itemList');
     // convert String to Array
     itemList = JSON.parse(itemList);
     //find the active account
      item = {
        user: {
          name: "",
          password: "",
          isLogin: false,
        },
        poll: [],
      };
      

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

     