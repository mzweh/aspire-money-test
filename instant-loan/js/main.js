'use strict'
//************** ALERTIFY **************
alertify.set('notifier', 'delay', 3);
alertify.set('notifier', 'position', 'bottom-left');
alertify.set('prompt', 'reverseButtons', true);
alertify.set('prompt', 'transition', 'fade');
alertify.set('confirm', 'transition', 'fade');

//************** CHECK SCROLL **************
function addScrolled(e) {
    if ($(document).scrollTop() > 10) {
        $('body').addClass("scrolled");
    } else {
        $('body').removeClass("scrolled");
    }
}
addScrolled();
$(document).on("scroll", function() {
    addScrolled();
});



function scrollDown(divId) {

    var oH = document.getElementById('mainNav').offsetHeight;
    var offSet = oH;
    $('html, body').animate({
        scrollTop: $('#' + divId).offset().top - offSet
    }, 1000);
    console.log(divId + ' - ' + offSet);
}

$('._jsScrollDownArrow').on('click', function() {
    var getId = $(this).attr('data-to');
    scrollDown(getId);
});

//************** REMOVE LOADING CLASS **************
$(window).on("load", function() {
    document.body.classList.remove('loading');
});



$(document).ready(function() {
    //************** FORM PRICE SLIDER **************//
    $("#amount").slider();
    $("#amount").on("slide", function(slideEvt) {
        $("#sliderValue").text(slideEvt.value);
    });


    //************** COUNT UP **************//    
    $('.numCounter').counterUp({
        delay: 10,
        time: 1000
    });
});


//************** FEATURE SLIDER **************
var featureSwiper = new Swiper('.testimonialSlider', {
    autoplay: {
        delay: 6500
    },
    loop: true,
    effect: 'slide',
    slidesPerView: 2,
    spaceBetween: 20,
    speed: 1000,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        575: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    }
});



var swiper = new Swiper('.brandSlider', {
    loop: true,
    autoplay: {
        delay: 2500,
    },
    slidesPerView: 5,
    spaceBetween: 30,
    breakpoints: {
        375: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        452: {
            slidesPerView: 2,
            spaceBetween: 1,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 1,
        },
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

//************** BACK TO TOP **************
var btn = $('#backTop');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});



//************** FORM VALIDATION **************

// Validation for south afican mobile number
$.formUtils.addValidator({
    name: 'mobileNo',
    validatorFunction: function(value, $el, config, language, $form) {
        var regex = new RegExp(/((?:\+27|27)|0)(=\d{1}|31|72|81|82|73|83|74|84|85|86|87|88|89|76|61|60|62|63|70|71|72|73|74|78|79)\s?(\d{7})/); //('/^(\+?27|0)\s?\d{2}\s?\d{3}\s?\d{4}$/');
        return regex.test(value);
    },
    errorMessage: 'Please enter valid South African mobile number.',
    errorMessageKey: 'badMobileNumber'
});
$.validate();

$.validate({
    form: '#contactForm, #quoteForm',
    onError: function($form) {
        alertify.error('Please make sure all fields are filled in correctly');
        console.log('not submitted');
        return false; // this will stop the submission of the form
    },
    onSuccess: function($form) {

    },
});


//************** CONTACT US FORM **************

$("._jsSubmitContact").click(function(e) {
    e.preventDefault();

    if (!$('#contactForm').isValid()) {
        return false;
    } else {
        $('#contactForm').addClass('loading');
        $(this).addClass('loading');
        $(this)[0].setAttribute('disabled', '');
        contactUsForm();

    }
});

function contactUsForm(e) {
    var name = $("#name").val();
    var phoneNo = $("#mobileNo").val();
    var email = $("#email").val();
    var contactMessage = $("#message").val();

    $.ajax({
        type: 'POST',
        url: '/#',
        headers: { 'X-CSRF-TOKEN': $('input[name=_token]').val() },
        data: {
            name: name,
            phoneNo: phoneNo,
            email: email,
            message: contactMessage,
        },
        success: function(data) {
            alertify.success('Thank you! Your request has been submitted.');
            $('#contactForm').removeClass('loading');
            $('#contactForm').get(0).reset();
            $("._jsSubmitContact")[0].removeAttribute("disabled");
            $('._jsSubmitContact').removeClass('loading');
            $('._jsSubmitContact').text('Submit');
        },
        error: function(error) {
            alertify.error('Ooops there was an error sending your contact email.');
            $('#contactForm').removeClass('loading');
            $("._jsSubmitContact")[0].removeAttribute("disabled");
            $('._jsSubmitContact').removeClass('loading');
            $('._jsSubmitContact').text('Submit');
            if (error.response.status === 422) {
                console.log(error);
            } else if (error.response.status === 503) {
                console.log(error);
            }
        }
    });
}

//************** QUOTE FORM **************

$("._jsSubmitQuote").click(function(e) {
    e.preventDefault();

    if (!$('#quoteForm').isValid()) {
        return false;
    } else {
        $('#quoteForm').addClass('loading');
        $(this).addClass('loading');
        $(this)[0].setAttribute('disabled', '');
        contactUsForm();

    }
});

function quoteForm(e) {
    var name = $("#name").val();
    var phoneNo = $("#phoneNo").val();
    var email = $("#email").val();
    var contactMessage = $("#message").val();

    $.ajax({
        type: 'POST',
        url: '/#',
        headers: { 'X-CSRF-TOKEN': $('input[name=_token]').val() },
        data: {
            name: name,
            phoneNo: phoneNo,
            email: email,
            message: contactMessage,
        },
        success: function(data) {
            alertify.success('Thank you! Your request has been submitted.');
            $('#quoteForm').removeClass('loading');
            $('#quoteForm').get(0).reset();
            $("._jsSubmitContact")[0].removeAttribute("disabled");
            $('._jsSubmitContact').removeClass('loading');
            $('._jsSubmitContact').text('Submit');
        },
        error: function(error) {
            alertify.error('Ooops there was an error sending your contact email.');
            $('#quoteForm').removeClass('loading');
            $("._jsSubmitContact")[0].removeAttribute("disabled");
            $('._jsSubmitContact').removeClass('loading');
            $('._jsSubmitContact').text('Submit');
            if (error.response.status === 422) {
                console.log(error);
            } else if (error.response.status === 503) {
                console.log(error);
            }
        }
    });
}