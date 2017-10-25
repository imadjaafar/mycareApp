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
            location.href = "nurse_index.html";
        }
        
        if (window.location.hash.replace("#", "") != '') {
            var currentDate = window.location.hash.replace("#", "");            
            $('#main_calendar').datepicker("setDate", currentDate.replace(/-/g,'/'));
        }
        var dateObject = $("#main_calendar").datepicker('getDate');
        var currentDate = $.datepicker.formatDate('yy-mm-dd', dateObject);
        
        getPatientList(currentDate, 2);
      
        $('#main_calendar').change(function () {
            var dateObject = $("#main_calendar").datepicker('getDate');
            var currentDate = $.datepicker.formatDate('yy-mm-dd', dateObject);
            getPatientList(currentDate, 2);
        });

        $('#view-all-patient-list').click(function () {
            var dateObject = $("#main_calendar").datepicker('getDate');
            var currentDate = $.datepicker.formatDate('yy-mm-dd', dateObject);
            getPatientList(currentDate, 100);
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
        $('.fill_out').click(function () {
            $('#patient-name-2').val(patientFirstName + ' ' + patientLastName);
            $('#patient-age-2').val(patientAge);
            $('#patient-gender-2').val(patientGenderTitle);
            $('#patient-diagnosis-2').val(patientDiagnisis);

            medicationArray = [];
            getMedicationArrayCounter = 5

            injectionArray = [];
            getInjectionArrayCounter = 2;

            getMedicationArray();
            getInjectionArray();
            setTimeout(function () {
                $.mobile.changePage("#create-patient-report", { transition: "slide" });
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            }, 500);
        });

        $('.futurebtn').click(function () {
            //$('.ui-datepicker-trigger').trigger('click');
            $("#second_calendar").datepicker("show");
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
            }, 500);
        });
        $('.backbtn2').click(function () {
            setTimeout(function () {
                $.mobile.changePage("#client-list", { transition: "slide", reverse: true });
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
            }, 500);
        });
        $('.backbtn3').click(function () {
            $.mobile.loading("show", {
                text: "foo",
                textVisible: false,
                theme: "a",
                html: ""
            });
            setTimeout(function () {
                $.mobile.loading("hide", {
                    text: "foo",
                    textVisible: false,
                    theme: "a",
                    html: ""
                });
                $.mobile.changePage("#patient-reports", { transition: "slide", reverse: true });
            }, 500);
        });
        $('.savedailyreportbtn').click(function () {
            var newMedicationArray = [];
            for (var i = 1; i <= medicationArray.length; i++) {
                newMedicationArray.push($('#medication_' + i).val() + ':' + $('#medication_timing_' + i).val() + ':' + $('#medication_qty_' + i).val());
            }
            $('#medicationArray').val(newMedicationArray);

            var newInjectionArray = [];
            for (var i = 1; i <= injectionArray.length; i++) {
                newInjectionArray.push($('#injection_' + i).val() + ':' + $('#injection_timing_' + i).val() + ':' + $('#injection_qty_' + i).val());
            }
            
            $('#injectionArray').val(newInjectionArray);
            
            $('.save-daily-report').submit();           
        });       
        $('.save-daily-report').submit(function (e) {                       
            var formUrl = $('.save-daily-report').attr('action');
            var file_data = $('#report_file').prop('files')[0];
            //uploadFile(file_data);
            //console.log(file_data);

            $.ajax({
                url: localStorage.getItem('MAIN_URL') + formUrl,
                type: 'POST',
                dataType: 'json',
                data: {
                    UserNurseId: 1, scheduleId: $('#scheduleId-2').val(), vitalSignsId: $('input[name=vital-signs-id]:checked').val(), bodyTemperature: $('#body-temperature').val()
                    , bloodPressure: $('#blood-pressure').val(), heartRate: $('#heart-rate').val(), respirationRate: $('#respiration-date').val()
                    , bloodGlucoseLevel: $('#blood-glucose-level').val(), nurseReport: $('#nurse_report').val(), file_data: file_data, medicationArray: $('#medicationArray').val()
                    , injectionArray: $('#injectionArray').val()
                    , morningTime: $('#morning_time').val(), morningDesc: $('#morning_desc').val(), morningQty: $('#morning_qty').val()
                    , afternoonTime: $('#afternoon_time').val(), afternoonDesc: $('#afternoon_desc').val(), afternoonQty: $('#afternoon_qty').val()
                    , eveningTime: $('#evening_time').val(), eveningDesc: $('#evening_desc').val(), eveningQty: $('#evening_qty').val()
                    , nightTime: $('#night_time').val(), nightDesc: $('#night_desc').val(), nightQty: $('#night_qty').val()
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

                    }
                    setTimeout(function () {
                        $.mobile.loading("hide", {
                            text: "foo",
                            textVisible: false,
                            theme: "a",
                            html: ""
                        });
                        $.mobile.changePage("#patient-reports", { transition: "slide" });
                    }, 1000);

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

            e.preventDefault();
        });

        function uploadFile(file) {

            var win = function (r) {
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
            }

            var fail = function (error) {
                alert("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            }

            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = "text/plain";

            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(fileURL, encodeURI("http://some.server.com/upload.php"), win, fail, options);

            
        }
        $('#client-list-div').on('click', '.patient-profile', function () {            
            getClientProfile($(this).attr('patient-id'));
        });
        $('#client-list-div').on('click', '.patient-daily-report', function () {
            getClientProfileReport($(this).attr('patient-id'));            
        });
    }
    function getMedicationArray() {
        for (var i = 1; i <= getMedicationArrayCounter; i++) {
            medicationArray.push(i);
        }
        $('#medicationArray').val(medicationArray);       
    }
    function getInjectionArray() {
        for (var i = 1; i <= getInjectionArrayCounter; i++) {
            injectionArray.push(i);
        }
        $('#injectionArray').val(injectionArray);
    }
    function getPatientList(currentDate, rowNbr) {        
        var formUrl = 'get-nurse-client-list';
        $.ajax({
            url: localStorage.getItem('MAIN_URL') + formUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                UserId: localStorage.getItem('UserId'), strDate: currentDate, rowNbr: rowNbr
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
                    html += '<span class="myr_font_bold red_color">' + list[i].timeFrom + ' - ' + list[i].timeTo + '</span><br />';
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
                    $('#scheduleId-2').val(scheduleId);
                });
                formUrl = 'get-future-dates';
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
                        var futureDate = [];
                        var list = response.status;
                        list.forEach(function (listItem, i) {
                            futureDate.push(list[i].futureDate);
                        });
                        var date = new Date();
                        $('#second_calendar').multiDatesPicker({
                            addDates: futureDate,
                            defaultDate: date,
                            onSelect: function (dateText, inst) {
                                getFuturePatientList(dateText);
                            }
                        });
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
    function getFuturePatientList(currentDate) {
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
                    html += '<div class="nurse_data"><div class="nurse_data_image"><img src="' + imageUrl + '" /></div>';
                    html += '<div class="nurse_data_details"><span class="neo_bold nurse_data_name blue_color">' + list[i].firstName + ' ' + list[i].lastName + '</span><br />';
                    html += '<span class="myr_font_bold red_color">' + list[i].timeFrom + ' - ' + list[i].timeTo + '</span><br />';
                    html += '<button class="view_details patient-profile" patient-id="' + list[i].userPatientId + '">View Profile</button>' +
                            '<button class="view_details patient-daily-report" schedule-id="' + list[i].scheduleId + '" patient-id="' + list[i].userPatientId + '">Report</button>' +
                            '</div></div>';
                });
                setTimeout(function () {
                    $('#main_calendar').datepicker("setDate", currentDate);
                    $.mobile.changePage("#client-list", { transition: "slide", reverse: true });
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
    
})();