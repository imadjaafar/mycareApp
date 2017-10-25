// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    var patientFirstName = '';
    var patientLastName = '';
    var patientAddress = '';
    var patientPhone = '';
    var patientGenderTitle = '';
    var patientNatioalityTitle = '';
    var patientCivilid = '';
    var patientDiagnisis = '';
    var patientImage = '';
    var patientAge = '';
    var scheduleId = 0;

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    function onDeviceReady() {
        $('.user_name').html(localStorage.getItem('FirstName') + ' ' + localStorage.getItem('LastName'));
        var imageUrl = localStorage.getItem('MAIN_URL') + "uploads/profiles/" + localStorage.getItem('Image');
        imageExists(imageUrl, function (exists) {
            if (exists)
                $(".user_image").attr("src", imageUrl);//images/profile_pic.png            
        });
        $('#main_calendar').datepicker({
            inline: true,
            firstDay: 0,
            showOtherMonths: true,
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        });

        var isTruted = false;
        if (localStorage.getItem("UserId") > 0) {
            isTruted = true;
        }
        if (isTruted == false) {
            location.href = "index.html";
        }

        var dateObject = $("#main_calendar").datepicker('getDate');
        var currentDate = $.datepicker.formatDate('yy-mm-dd', dateObject);
        getPatientList(currentDate);
      
        $('#main_calendar').change(function () {
            var dateObject = $("#main_calendar").datepicker('getDate');
            var currentDate = $.datepicker.formatDate('yy-mm-dd', dateObject);
            getPatientList(currentDate);
        });

        $('#view-all-patient-list').click(function () {
            getPatientList('');
        });
        $('#patient_profile').click(function () {
            location.href = "nurse_data_calendar.html";
        });

        $('.backbtn').click(function () {
            setTimeout(function () {
                $.mobile.changePage("#client-list", { transition: "slide" });
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            }, 500);
        });
        $('.backbtn2').click(function () {
            setTimeout(function () {
                $.mobile.changePage("#client-list", { transition: "slide" });
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            }, 500);
        });
        $('.backbtn3').click(function () {
            setTimeout(function () {
                $.mobile.changePage("#patient-reports", { transition: "slide" });
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            }, 500);
        });

        $('.fill_out').click(function () {
            $('#patient-name-2').val(patientFirstName + ' ' + patientLastName);            
            $('#patient-age-2').val(patientAge);
            $('#patient-gender-2').val(patientGenderTitle);
            $('#patient-diagnosis-2').val(patientDiagnisis);

            setTimeout(function () {
                console.log(scheduleId);
                $.mobile.changePage("#create-patient-report", { transition: "slide" });
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            }, 500);
        });


        $('#client-list-div').on('click', '.patient-profile', function () {            
            getClientProfile($(this).attr('patient-id'));
        });

        $('#client-list-div').on('click', '.patient-daily-report', function () {
            getClientProfileReport($(this).attr('patient-id'));            
        });
    }

    function getPatientList(currentDate) {        
        var formUrl = 'get-nurse-client-list';
        $.ajax({
            url: localStorage.getItem('MAIN_URL') + formUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                UserId: localStorage.getItem('UserId'), strDate: currentDate
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
                    var patientImage = 'images/nurse_logo.png';
                    var imageUrl = localStorage.getItem('MAIN_URL') + "uploads/profiles/" + list[i].patientImage;
                    //imageExists(imageUrl, function (exists) {
                    //    if (exists)
                    //        patientImage = imageUrl;//images/profile_pic.png            
                    //});
                    html += '<div class="nurse_data"><div class="nurse_data_image"><img src="' + imageUrl + '" /></div>';
                    html += '<div class="nurse_data_details"><span class="neo_bold nurse_data_name blue_color">' + list[i].firstName + ' ' + list[i].lastName + '</span><br />';
                    html += '<span class="myr_font_bold red_color">Work Hours</span><br />';
                    html += '<button class="view_details patient-profile" patient-id="' + list[i].userPatientId + '">View Profile</button>' +
                            '<button class="view_details patient-daily-report" schedule-id="' + list[i].scheduleId + '" patient-id="' + list[i].userPatientId + '">Report</button>' +
                            '</div></div>';
                });
                setTimeout(function () {
                    $('#client-list-div').html('');
                    $('#client-list-div').append(html).trigger("refresh");
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
    function getClientProfile(patientId) {
        var formUrl = 'client-profile';
        $.ajax({
            url: localStorage.getItem('MAIN_URL') + formUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                UserId: localStorage.getItem('UserId'), patientId: patientId
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
                    var patientImage = 'images/nurse_logo.png';
                    var imageUrl = localStorage.getItem('MAIN_URL') + "uploads/profiles/" + list[i].image;
                    $('#patient-image').attr('src', imageUrl);
                    $('#patient-first-name').val(list[i].firstName);
                    $('#patient-last-name').val(list[i].lastName);
                    $('#patient-gender').val(list[i].genderTitle);
                    $('#patient-nationality').val(list[i].natioalityTitle);
                    $('#patient-civilid').val(list[i].civilid);
                    $('#patient-diagnosis').val(list[i].diagnisis);
                    $('#patient-phone-number').val(list[i].phone);
                    $('#patient-address').val(list[i].address);
                    console.log(list);
                    patientFirstName = list[i].firstName;
                    patientLastName = list[i].lastName;
                    patientAddress = list[i].address;
                    patientPhone = list[i].phone;
                    patientGenderTitle = list[i].genderTitle;
                    patientNatioalityTitle = list[i].natioalityTitle;
                    patientCivilid = list[i].civilid;
                    patientDiagnisis = list[i].diagnisis;
                    patientImage = imageUrl;
                    patientAge = list[i].age;
                    scheduleId = list[i].scheduleId;

                });
                setTimeout(function () {
                    $.mobile.changePage("#patient-profile-page", { transition: "slide" });
                    $.mobile.loading("hide", {
                        text: "foo",
                        textVisible: false,
                        theme: "a",
                        html: ""
                    });
                }, 500);
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
    function getClientProfileReport(patientId) {
        var formUrl = 'client-profile';
        $.ajax({
            url: localStorage.getItem('MAIN_URL') + formUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                UserId: localStorage.getItem('UserId'), patientId: patientId
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
                    var patientImage = 'images/nurse_logo.png';
                    var imageUrl = localStorage.getItem('MAIN_URL') + "uploads/profiles/" + list[i].image;
                    
                    patientFirstName = list[i].firstName;
                    patientLastName = list[i].lastName;
                    patientAddress = list[i].address;
                    patientPhone = list[i].phone;
                    patientGenderTitle = list[i].genderTitle;
                    patientNatioalityTitle = list[i].natioalityTitle;
                    patientCivilid = list[i].civilid;
                    patientDiagnisis = list[i].diagnisis;
                    patientImage = imageUrl;
                    patientAge = list[i].age;
                    scheduleId = list[i].scheduleId;

                    $('.patient_image').attr('src', imageUrl);
                    $('.patient_age').html(patientAge);
                    $('.patient_gender').html(patientGenderTitle);
                    $('.patient_nationality').html(patientNatioalityTitle);
                    $('.patient_civilid').html(patientCivilid);
                    $('.patient_address').html(patientPhone + '</br>' + patientAddress);
                    $('.patient_diagnisis').html(patientDiagnisis);

                    $('#patient-name-2').val(list[i].firstName + '' + list[i].lastName);
                    $('#patient-age-2').val(patientAge);
                    $('#patient-gender-2').val(patientGenderTitle);
                    $('#patient-diagnosis-2').val(patientDiagnisis);
                });
                setTimeout(function () {
                    $.mobile.changePage("#patient-reports", { transition: "slide" });
                    $.mobile.loading("hide", {
                        text: "foo",
                        textVisible: false,
                        theme: "a",
                        html: ""
                    });
                }, 500);
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