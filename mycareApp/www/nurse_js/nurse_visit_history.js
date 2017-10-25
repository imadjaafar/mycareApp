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
    
    var medicationArray = [];
    var getMedicationArrayCounter = 0;

    var injectionArray = [];
    var getInjectionArrayCounter = 0; 

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
        getPatientList('');

        $('#client-list-div').on('click', '.patient-profile', function () {
            getClientProfile($(this).attr('patient-id'));
        });
        $('.backbtn').click(function () {
            setTimeout(function () {
                $.mobile.changePage("#client-list", { transition: "slide", reverse: true });
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            }, 200);
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

    function getPatientList(currentDate) {
        var formUrl = 'get-nurse-all-client-list';
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
                    var imageUrl = localStorage.getItem('MAIN_URL') + "uploads/profiles/" + list[i].image;
                    html += '<div class="nurse_data"><div class="nurse_data_image"><img src="' + imageUrl + '" /></div>';
                    html += '<div class="nurse_data_details"><span class="neo_bold nurse_data_name blue_color">' + list[i].firstName + ' ' + list[i].lastName + '</span><br />';
                    html += '<span class="myr_font_bold red_color">' + list[i].timeFrom + ' - ' + list[i].timeTo + '</span><br />';
                    html += '<button class="view_details patient-profile" patient-id="' + list[i].userPatientId + '">View Profile</button>' +                            
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
                    $('#scheduleId-2').val(scheduleId);
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