// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    function onDeviceReady() {
        if (localStorage.getItem("UserId") === null) {
            localStorage.setItem('UserId', 0);
        }
        $('.user_name').html(localStorage.getItem('FirstName') + ' ' + localStorage.getItem('LastName'));
        var imageUrl = localStorage.getItem('MAIN_URL') + "uploads/profiles/" + localStorage.getItem('Image');
        imageExists(imageUrl, function (exists) {
            if (exists)
                $(".user_image").attr("src", imageUrl);//images/profile_pic.png            
        });
        getNurseNotifications();

        $('#notificcations-list-div').on('click', '.notificationRow', function () {
            location.href = "nurse_clients_name.html#" + $(this).attr('schedule-date');
        });
      
        $('.patient_profile').click(function () {
            location.href = "nurse_data_calendar.html";
        });
        $('.clients_list').click(function () {
            location.href = "nurse_clients_name.html";
        });
        $('.clients_list_history').click(function () {
            location.href = "nurse_visit_history.html";
        });

        $('.notification_page').click(function (e) {
            location.href = "nurse_notifications.html";
        });
    }

    function getNurseNotifications() {
        var formUrl = 'get-nurse-notifications';
        $.ajax({
            url: localStorage.getItem('MAIN_URL') + formUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                UserId: localStorage.getItem('UserId')
            },
            beforeSend: function () {
                $.mobile.loading("show", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            },
            success: function (response) {
                var html = '';                
                var list = response.status;
                list.forEach(function (listItem, i) {
                    var strClass = "div1_notif";
                    if ((i % 2) == 1)
                        strClass = "div2_notif";                    
                    html += '<div class="' + strClass + ' notificationRow" schedule-date="' + list[i].dateTimeFrom + '"><img src="images/notif.png"/>';
                    html += '<span class="myr_font_reg">A new schedule, ' + list[i].firstName + ' ' + list[i].lastName + ', '+list[i].dateTimeFrom+'</span></div>';                    
                });
                setTimeout(function () {
                    $('#notificcations-list-div').html('');
                    $('#notificcations-list-div').append(html).trigger("refresh");
                    $.mobile.loading("hide", {
                        text: "foo",
                        textVisible: false,
                        theme: "a",
                        html: ""
                    });
                }, 1500);
            },
            error: function (xhr, status, error) {
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            }
        });                
    }
    
})();