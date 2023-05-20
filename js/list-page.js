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
        var pollStatus = poll.isActive;
        var userName = user.name; // Retrieve the user's name
        tableRows += '<tr>';
        tableRows += '<th scope="row">' + (index + 1) + '</th>';
        tableRows += '<td>' + poll.name + '<span class="badge badge-primary ml-2 poll-status">' + (pollStatus ? 'Active' : 'Closed') + '</span>' + '<br style="border-top: 1px solid #000;"> <hr> <b>Created by</b>: ' +'<span class="badge badge-danger ml-2">' + userName + '</span>' + '</td>';        tableRows += '<td>';
        tableRows += '<div class="btn-group mr-2" role="group">';
        tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-primary btn-view-result">View result</button>';
        if (pollStatus) {
        tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-dark btn-close-poll">Close Poll</button>';
        } else if (!pollStatus) {
            tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-dark btn-open-poll">Open Poll</button>';
        }
        tableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-danger btn-delete-poll">Delete</button>';
        tableRows += '</div>';
        tableRows += '</td>';
        tableRows += '</tr>';

        
    });
});


// Append the table rows to the table body
$('#polls-list').html(tableRows);




     //handle the All filter button
$(document).on('click', '#allButton', function(){
    $('#polls-list').html(tableRows);

    // Handle Close Poll button click
$('.btn-close-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});

// Handle Open Poll button click
$('.btn-open-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});

})
//handle the Active filter button
$(document).on('click', '#activeButton', function() {
    var activeTableRows = '';

    itemList.forEach(function (item) {
      var pollList = item.item.pollList;
      var user = item.item.user; // Retrieve the user object
    
      pollList.forEach(function (poll, index) {
        var pollStatus = poll.isActive;
        var userName = user.name; // Retrieve the user's name
    
        if (pollStatus) { // Only display polls with isActive status as true
          activeTableRows += '<tr>';
          activeTableRows += '<th scope="row">' + (index + 1) + '</th>';
          activeTableRows += '<td>' + poll.name + '<span class="badge badge-primary ml-2 poll-status">' + (pollStatus ? 'Active' : 'Closed') + '</span>' + '<br style="border-top: 1px solid #000;"> <hr> <b>Created by</b>: ' +'<span class="badge badge-danger ml-2">' + userName + '</span>' + '</td>';
          activeTableRows += '<td>';
          activeTableRows += '<div class="btn-group mr-2" role="group">';
          activeTableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-primary">View result</button>';
          if (pollStatus) {
            activeTableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-dark btn-close-poll">Close Poll</button>';
          } else if (!pollStatus) {
            activeTableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-dark btn-open-poll">Open Poll</button>';
          }
          activeTableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-danger btn-delete-poll">Delete</button>';
          activeTableRows += '</div>';
          activeTableRows += '</td>';
          activeTableRows += '</tr>';
        }
      });
    });

    //append the active table row on the table
    $('#polls-list').html(activeTableRows);

    // Handle Close Poll button click
$('.btn-close-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});

// Handle Open Poll button click
$('.btn-open-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});

});

//handle the Closed filter button
$(document).on('click', '#closedButton', function() {
    var closedTableRows = '';

    itemList.forEach(function (item) {
      var pollList = item.item.pollList;
      var user = item.item.user; // Retrieve the user object
    
      pollList.forEach(function (poll, index) {
        var pollStatus = poll.isActive;
        var userName = user.name; // Retrieve the user's name
    
        if (!pollStatus) { // Only display polls with isActive status as true
          closedTableRows += '<tr>';
          closedTableRows += '<th scope="row">' + (index + 1) + '</th>';
          closedTableRows += '<td>' + poll.name + '<span class="badge badge-primary ml-2 poll-status">' + (pollStatus ? 'Active' : 'Closed') + '</span>' + '<br style="border-top: 1px solid #000;"> <hr> <b>Created by</b>: ' +'<span class="badge badge-danger ml-2">' + userName + '</span>' + '</td>';
          closedTableRows += '<td>';
          closedTableRows += '<div class="btn-group mr-2" role="group">';
          closedTableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-primary">View result</button>';
          if (pollStatus) {
            closedTableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-dark btn-close-poll">Close Poll</button>';
          } else if (!pollStatus) {
            closedTableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-dark btn-open-poll">Open Poll</button>';
          }
          closedTableRows += '<button type="button" style="margin: 2px; border: 1px solid; border-radius: 5px;" class="btn btn-danger btn-delete-poll">Delete</button>';
          closedTableRows += '</div>';
          closedTableRows += '</td>';
          closedTableRows += '</tr>';
        }
      });
    });

    //append the closed table row on the table
    $('#polls-list').html(closedTableRows);

    // Handle Close Poll button click
$('.btn-close-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});

// Handle Open Poll button click
$('.btn-open-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});

});



  


// Handle Close Poll button click
$('.btn-close-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));

    // Handle Close Poll button click
$('.btn-close-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});

// Handle Open Poll button click
$('.btn-open-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});

});

// Handle Open Poll button click
$('.btn-open-poll').on('click', function () {
    var self = this; // Store reference to the button

    var row = $(this).closest('tr');
    var pollStatusBadge = row.find('.poll-status');
    var pollStatusText = pollStatusBadge.text();
    var pollStatus = pollStatusText === 'Active'; // Convert the text to a boolean value

    // Find the corresponding poll object in the itemList array
    var pollIndex = row.index();
    var itemList = localStorage.getItem('itemList');
    itemList = JSON.parse(itemList);

    // Loop through each item in the itemList and update the poll status
    itemList.forEach(function (user, userIndex) {
        user.item.pollList.forEach(function (poll, innerPollIndex) {
            if (innerPollIndex === pollIndex) { // <-- Use innerPollIndex instead of pollIndex
                if (pollStatus) {
                    poll.isActive = false; // Set isActive to false
                    pollStatusBadge.text('Closed');
                    pollStatusBadge.addClass('badge-secondary');
                    $(self).text('Open Poll');
                } else {
                    poll.isActive = true; // Set isActive to true
                    pollStatusBadge.text('Active');
                    pollStatusBadge.removeClass('badge-secondary');
                    $(self).text('Close Poll');
                }
            }
        });
    });

    // Update the itemList in localStorage
    localStorage.setItem('itemList', JSON.stringify(itemList));
});



    





});

// Handle Delete Poll button click
$(document).on('click', '.btn-delete-poll', function () {
    var row = $(this).closest('tr');
    var rowIndex = row.index();
    
    // Ask for confirmation
    var confirmDelete = confirm("Are you sure you want to delete this poll?");
    
    if (confirmDelete) {
        // Find the user's poll list
        var itemList = localStorage.getItem('itemList');
        itemList = JSON.parse(itemList);
        
        // Loop through each item in itemList to find the correct user and poll
        for (var i = 0; i < itemList.length; i++) {
            var user = itemList[i].item.user;
            var pollList = itemList[i].item.pollList;
            
            // Loop through the pollList to find the correct poll at the rowIndex
            for (var j = 0; j < pollList.length; j++) {
                if (j === rowIndex) {
                    // Remove the poll at the rowIndex from the user's poll list
                    pollList.splice(j, 1);
                    
                    // Update the itemList in localStorage
                    localStorage.setItem('itemList', JSON.stringify(itemList));
                    
                    // Remove the table row from the DOM
                    row.remove();
                    break;
                }
            }
        }
    }
});
