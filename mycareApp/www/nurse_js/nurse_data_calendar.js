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
        $('.user_age').html(localStorage.getItem('Age'));
        $('.user_age').html(localStorage.getItem('Age'));
        $('.user_gender').html(localStorage.getItem('GenderTitle'));
        $('.user_nationality').html(localStorage.getItem('NationalityTitle'));
        $('.user_experience').html(localStorage.getItem('Experience'));
        $('.user_language').html(localStorage.getItem('Language'));
       

        var RateHtml = '';
        for (var i = 0; i < localStorage.getItem('Rate') ; i++) {
            RateHtml += '<img src="images/full_star.png" style="width:23px;display:inline-block;" class="empty_to_full full"/>';
        }
        for (var i = 0; i < 5-localStorage.getItem('Rate') ; i++) {
            RateHtml += '<img src="images/empty_star.png" style="width:23px;display:inline-block;" class="empty_to_full empty"/>';
        }
        $('.user_rate').html('');
        $('.user_rate').append(RateHtml);

        $('#nurse_edit_profile_btn').click(function () {            
            $.mobile.changePage("#nurse_edit_profile", { transition: "slide" });
        });
        
        $('#first_name').val(localStorage.getItem('FirstName'));
        $('#last_name').val(localStorage.getItem('LastName'));
        $('#age').val(localStorage.getItem('Age'));
        $('#gender_id').val(localStorage.getItem('GenderId'));
        $('#experience').val(localStorage.getItem('Experience'));
        $('#language').val(localStorage.getItem('Language'));
        $('#nationality').val(localStorage.getItem('NationalityId'));
        $('#qualification').val(localStorage.getItem('Qualification'));

        $('.submit_edit_profile_btn').click(function () {
          // $('.update-user-profile').submit();
            var formUrl = $('.update-user-profile').attr('action');
            $.ajax({
                url: localStorage.getItem('MAIN_URL') + formUrl,
                type: 'POST',
                dataType: 'json',
                data: {
                    userId: localStorage.getItem('UserId'), first_name: $('#first_name').val(),
                    last_name: $('#last_name').val(), age: $('#age').val(),
                    gender_id: $('#gender_id').val(), experience: $('#experience').val(),
                    language: $('#language').val(), nationality_id: $('#nationality').val(),
                    qualification: $('#qualification').val(), verification: 0
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
                    console.log(response);
                    if (response.status.length == 1) {
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

                        $('.user_name').html(localStorage.getItem('FirstName') + ' ' + localStorage.getItem('LastName'));
                        var imageUrl = localStorage.getItem('MAIN_URL') + "uploads/profiles/" + localStorage.getItem('Image');
                        imageExists(imageUrl, function (exists) {
                            if (exists)
                                $(".user_image").attr("src", imageUrl);//images/profile_pic.png            
                        });
                        $('.user_age').html(localStorage.getItem('Age'));
                        $('.user_gender').html(localStorage.getItem('GenderTitle'));
                        $('.user_nationality').html(localStorage.getItem('NationalityTitle'));
                        $('.user_experience').html(localStorage.getItem('Experience'));
                        $('.user_language').html(localStorage.getItem('Language'));
                    }
                    setTimeout(function () {
                        $.mobile.loading("hide", {
                            text: "foo",
                            textVisible: false,
                            theme: "a",
                            html: ""
                        });
                        $.mobile.changePage("#nurse_profile", { transition: "slide", reverse: true });
                    }, 1500);

                },
                error: function (xhr, status, error) {
                   
                    $.mobile.loading("hide", {
                        text: "foo",
                        textVisible: false,
                        theme: "a",
                        html: ""
                    });
                    console.log(xhr.responseText);
                    //alert('your application has not successfully been submitted');
                }
            });
        });        
        
        $('.clients_list').click(function () {
            //$.mobile.changePage("clients_name.html", { transition: "slide" });
            location.href = "nurse_clients_name.html";
        });
        $('.patient_profile').click(function () {
            //$.mobile.changePage("clients_name.html", { transition: "slide" });
            location.href = "nurse_data_calendar.html";
        });
        $('.clients_list_history').click(function () {
            location.href = "nurse_visit_history.html";
        });       
        $('.notification_page').click(function (e) {
            location.href = "nurse_notifications.html";
        });

        function getUserImage() {
            navigator.camera.getPicture(uploadUserImage, function (message) {
                alert('get picture failed');
            }, {
                quality: 100,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            });
        }
        var UserImage = '';
        function uploadUserImage(imageURI) {
            $.mobile.loading("show", {
                text: "foo",
                textVisible: false,
                theme: "a",
                html: ""
            });
            UserImage = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            //var options = new FileUploadOptions();
            //options.fileKey = "file";
            //options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            //options.mimeType = "image/jpeg";
            //console.log(options.fileName);
            //$('#company_contract_doc').val(options.fileName + ".jpg");
            //var params = new Object();
            //params.value1 = "test";
            //params.value2 = "param";
            //options.params = params;
            //options.chunkedMode = false;

            //var ft = new FileTransfer();
            //ft.upload(imageURI, "https://server.multiframes.com/~akkargov/upload.php", function (result) {
            //    $.mobile.loading("hide", {
            //        text: "foo",
            //        textVisible: false,
            //        theme: "a",
            //        html: ""
            //    });
            //    console.log(JSON.stringify(result));
            //    alert("Upload Compleated");
            //}, function (error) {
            //    console.log(JSON.stringify(error));
            //    alert("Connect to the Internet before uploading image.");
            //    $.mobile.loading("hide", {
            //        text: "foo",
            //        textVisible: false,
            //        theme: "a",
            //        html: ""
            //    });
            //}, options);
        }

        function imageExists(url, callback) {
            var img = new Image();
            img.onload = function () { callback(true); };
            img.onerror = function () { callback(false); };
            img.src = url;
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