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
        $('#sign_in').click(function (e) {
            e.preventDefault();
            $("#login-form").submit();
        });

        $("#login-form")
			.submit(
					function (e) {
					    var formUrl = $(this).attr('action');
					    $
								.ajax({
								    url: localStorage.getItem('MAIN_URL') + formUrl,
								    type: 'POST',
								    dataType: 'json',
								    data: { username: $('#email').val(), password: (MD5($('#password').val())) },
								    beforeSend: function () {
								        $.mobile.loading("show", {
								            text: "foo",
								            textVisible: false,
								            theme: "a",
								            html: ""
								        });
								    },
								    success: function (response) {								       
								        if (response.status.length == 1) {
								            console.log(response);
								            localStorage.setItem('UserId', (response.status[0].userNurseId == null ? '0' : response.status[0].userNurseId));
								            localStorage.setItem('FirstName', (response.status[0].firstname == null ? '' : response.status[0].firstname));
								            localStorage.setItem('LastName', (response.status[0].lastname == null ? '' : response.status[0].lastname));
								            localStorage.setItem('UserType', 2);
								            localStorage.setItem('Image', (response.status[0].image == null ? '' : response.status[0].image));
								            localStorage.setItem('GenderId', (response.status[0].genderId == null ? '' : response.status[0].genderId));
								            localStorage.setItem('Email', (response.status[0].email == null ? '' : response.status[0].email));
								            localStorage.setItem('NationalityId', (response.status[0].nationalityId == null ? '' : response.status[0].nationalityId));
								            localStorage.setItem('Age', (response.status[0].age == null ? '' : response.status[0].age));
								            localStorage.setItem('GenderTitle', (response.status[0].genderTitle == null ? '' : response.status[0].genderTitle));
								            localStorage.setItem('NationalityTitle', (response.status[0].nationalityTitle == null ? '' : response.status[0].nationalityTitle));
								            localStorage.setItem('Language', (response.status[0].language == null ? '' : response.status[0].language));
								            localStorage.setItem('Experience', (response.status[0].experience == null ? '' : response.status[0].experience));
								            localStorage.setItem('Rate', (response.status[0].rate == null ? '' : response.status[0].rate));
								            localStorage.setItem('Qualification', (response.status[0].qualification == null ? '' : response.status[0].qualification));
								        }
								        setTimeout(function () {
								            $.mobile.loading("hide", {
								                text: "foo",
								                textVisible: false,
								                theme: "a",
								                html: ""
								            });
								            if (response.status.length == 1)
								                location.href = "nurse_clients_name.html";
								            else
								               navigator.notification.alert(
                                                'Invalid username or password',  // message
                                                alertDismissed,         // callback
                                                'Login',            // title
                                                'Done'                  // buttonName
                                            );
								        }, 1000);
								        
								    },
								    error: function (error) {
								        $.mobile.loading("hide", {
								            text: "foo",
								            textVisible: false,
								            theme: "a",
								            html: ""
								        });
								        alert('your application has not successfully been submitted');
								    }
								});

					    e.preventDefault();
					});
        function alertDismissed() {
            // do something           
        }
        $('#create_account').click(function (e) {
            e.preventDefault();
            window.location = 'index.html#page2';
        });



        $('#calendar').click(function (e) {
            e.preventDefault();
            window.location = 'calendar.html';
        });

        //$(".ui-datepicker-inline").prepend("<div>hello world</div>");


        $(".view").click(function (e) {
            e.preventDefault();
            window.location = 'profile_nurses.html';
        });


        var d = $('#comments_div');
        d.scrollTop(d.prop("scrollHeight"));


        $("#confirm").click(function (e) {
            $.mobile.changePage("#payment", { transition: "slide" });
        });




        $(".days_of_week").click(function (e) {
            e.preventDefault();
            window.location = 'timeline_daily.html';
        });



        $(".empty_to_full").click(function () {
            if (!$(this).hasClass('full')) {
                $(this).attr('src', 'images/full_star.png');
                $(this).addClass('full')
            } else {
                $(this).attr('src', 'images/empty_star.png');
                $(this).removeClass('full')
            }
        });


    }
})();