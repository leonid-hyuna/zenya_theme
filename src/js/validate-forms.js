
//= jquery.validate.min.js


$(document).ready(function() {

	//////////////////////////////////////
    ///            contact             ///
    //////////////////////////////////////

	$(".contact_form").validate({
		rules: {
			name: {
				required: true,
				lettersonly: true
			},
			email: {
				required: true,
				email: true
			},
			message: "required"

		},
		messages: {
			name: "Please enter your firstname",
			message: "Pleace enter your messege",
			email: "Please enter a valid email address"
		}
	});

	//////////////////////////////////////
    ///     cancel page function       ///
    //////////////////////////////////////

	$(".frmCancel").validate({

		rules: {
			password: {
				required: true,
				minlength: 5
			},
			email: {
				required: true,
				email: true
			},
			email2: {
				required: true,
				email: true
			},
			credit_card_number: {
			    required: true,
			    creditcard: true
			},
			are_you_sure: "required"

		},
		messages: {
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			credit_card_number: {
				required: "Please enter your credit card",
				creditcard: "only number credit card"
			},
			email: "Please enter a valid email address",
			email2: "Please enter a valid email address",
			are_you_sure: "Please accept our policy"
		}
	});

	//////////////////////////////////////
    ///     step 1 form function       ///
    //////////////////////////////////////

    var $conForm = $('#confirmation_form'),
        $errorMsg = $('.error_message_wrapper'),
        $emailUpdate = $("#email-update"),
        $overlay = $(".signup_overlay");

	$("#signup_form_1").validate({
		rules: {
			username: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			},
			password_confirm: {
				required: true,
				minlength: 5,
				equalTo: "#signup-passw"
			},
			are_you_sure: "required"
		},
		messages: {
			username: "Please enter a valid email address",
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			password_confirm: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Pleace enter the same password as above"
			},
			are_you_sure: "Please Confirm That You Agree With The Terms And Conditions And That You Are At Least 18 Years Of Age"
		},
        submitHandler: function(form) {
            $overlay.show();
            form.submit();
        }
	});

	//////////////////////////////////////
    ///     step 2 form function       ///
    //////////////////////////////////////

	$(".memberships").click(function(e){
        $('#plan_id').val($(this).attr('id'));
        $overlay.show();
        $('#premium_form').submit();
        return false;
    });

	//////////////////////////////////////
    ///     step 3 form function       ///
    //////////////////////////////////////

    var states = new Array('Select State', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming');
    var states_abb = new Array('', 'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY');
    var provinces = new Array('Select Province', 'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Nova Scotia','Nunavut','North West Territories','Ontario','Prince Edward Island','Quebec','Saskatchewen','Yukon');
    var prov_abb = new Array('','AB','BC','MB','NB','NL','NT','NS','NU','ON','PE','QC','SK','YT');
    var dd_country = $('#fake_country');

    if(dd_country.length>0){
        dd_country.on('change', setautocomplete);
        setautocomplete();
    }

    function setautocomplete(){
        var select_ind = document.secureForm.elements["fake_country"].selectedIndex,
        country_el = document.secureForm.elements["fake_country"].options[select_ind].value,
        whole_str="",
        countrCon = $('#fake-country-container'),
        setState = '<?=(isset($_GET["state"]) ? $_GET["state"] : "")?>';

        if(country_el == "CA" || country_el == "US")
        {
            if(country_el=="CA")
            {
                var str = "<?=getWord('W00412')?>";
                for(var i=0; i < provinces.length; i++)
                {
                    var dd_str = "<option value='"+prov_abb[i]+"'";
                    if(setState == prov_abb[i])
                        dd_str += "selected=selected";
                    dd_str += ">" + provinces[i] +"</option>";
                    whole_str =  whole_str+dd_str;
                }
            }
            else
            {
                var str = "<?=getWord('W00411')?>";
                for(var i=0; i < states.length; i++)
                {
                    var dd_str = "<option value='"+states_abb[i]+"'";
                    if(setState == states_abb[i])
                        dd_str += "selected=selected";
                    dd_str += ">" + states[i] +"</option>";
                    whole_str =  whole_str+dd_str;
                }
            }
            countrCon.next().remove();
            countrCon.after("<div id='state-container' class='small-12 columns'><select id='dd_state' class='select-box' name='state'>"+ whole_str +"</select></div>");
        }
        else {
            var stateSelect = $('#state-container');
            if(stateSelect.length){
                stateSelect.remove();
                countrCon.after("<div id='state-container' class='small-12 columns'><input type='text' name='state' class='input-box' id='txt_state' value=\"<?php echo $_POST['state'] ?>\" rel='type-2' placeholder=\"<?=getWord('W01087')?>\" /></div>");
            }
        }
    }

    jQuery.validator.addMethod("lettersonly", function( value, element ) {
       return this.optional(element) || /^[a-z A-Z ,.'-]+$/i.test( value );
    }, "Please enter only letters.");
    jQuery.validator.addMethod("ExpiryDate", function(value, element, params) {
        var minMonth = new Date().getMonth() + 1;
        var minYear = new Date().getFullYear();
        var month = parseInt($(params.month).val(), 10);
        var year = parseInt($(params.year).val(), 10);
        return (year > minYear || (year === minYear && month >= minMonth));
    }, "The expiry date is already passed");

    $("#secure-form").validate({
       rules: {
        first_name: {
         required: true,
         maxlength: 30,
         lettersonly: true
        },
        last_name: {
         required: true,
         maxlength: 30,
         lettersonly: true
        },
        address: {
            required: true
        },
        city: {
            required: true,
            lettersonly: true
        },
        state: {
            required: true
        },
        zip_code:{
            required: true,
            minlength: 3,
            maxlength: 30
        },
        fake_country: {
            required: true
        },
        ccn: {
            required: true,
            creditcard: true
        },
        month: {
            required: true
        },
        year: {
            required: true,
            ExpiryDate: {
                month: '#month',
                year: '#year'
            }
        },
        cvv2_code: {
            required: true,
            digits: true,
            minlength: 3
        },
        are_you_sure: "required"
       },
       messages: {
        first_name: {
         required: "Please enter your first name",
         maxlength: "First name cannot exceed 30 characters.",
         lettersonly: "Please enter your valid first name"
        },
        last_name: {
         required: "Please enter your last name",
         maxlength: "First name cannot exceed 30 characters.",
         lettersonly: "Please enter your valid last name"
        },
        address: "Please enter your address",
        zip_code: "Please enter a zip code",
        ccn: "Invalid VISA/MASTERCARD number.",
        month: "<?=getWord('W01123')?>",
        year: "<?=getWord('W01123')?>",
        cvv2_code: "Invalid CVV2 number.",
        are_you_sure: "Please Confirm That You Agree"
       },
       submitHandler: function(form) {
        $overlay.show();
        form.submit();
      }
    });

    //////////////////////////////////////
    ///      step 4   form function    ///
    //////////////////////////////////////

    $('#unicef-button').click(function(e){
        document.frmUnicef.donate.value = 'no';
        document.frmUnicef.submit();
        $overlay.show();
        return false;
    });
    $('#unicef-button-2').click(function(e){
        document.frmUnicef.donate.value = 'yes';
        document.frmUnicef.submit();
        $overlay.show();
        return false;
    });

    //////////////////////////////////////
    ///      step 5 form function      ///
    //////////////////////////////////////

    $("#goto").click(function(){
        $overlay.show();
    });

    //////////////////////////////////////
    ///      step 6 form function      ///
    //////////////////////////////////////

    $(".change-email-btn").click(function(event) {
        $('p.error_message').remove();
    });
    
    $("#continue-receipt").click(function(event) {
        $conForm.submit();
        $overlay.show();
        return false;
    });

    var hasError;
    function setError(x){
        hasError = x;
    }
    $emailUpdate.submit(function(){
        setError(false);
        $overlay.show();

        var $form = $(this);
        var serializedData = $form.serialize();

        $('.error_message').remove();
        var emailVal = $('#new_email').val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if(emailVal === '')
        {
            $overlay.hide();
            $errorMsg.append("<p class='error_message error'>Please enter your email address.</p>");
            setError(true);
        }
        else if(!emailReg.test(emailVal))
        {
            $overlay.hide();
            $errorMsg.append("<p class='error_message error'>Please Enter a Valid email.</p>");
            setError(true);
        }

        if(hasError === true)
        {
            return false;
        }
        else
        {
            $.ajax({
                type: "POST",
                url: "<?php echo getURL('signup','change_email', array(), Ihub_Config::get()->retrieve('main','secure_base_url')); ?>",
                data: serializedData,
                dataType: "json",
                success:function(data, textStatus, errorThrown){
                    if(data.result == 'true'){ // pass validation
                        $('#email-update-modal').hide();
                        $('.reveal-overlay').hide();
                        $('body').removeClass("is-reveal-open");

                        $('.email-value').html(data.new_email);

                        $errorMsg.append("<p class='error_message valid'>Email Successfully changed and confirmation sent</p>");
                        //tracking code
                        if(typeof gtm_track_event == 'function') {
                            gtm_track_event('Account', 'Email Changed', 'From Receipt Page');
                        }
                        $overlay.hide();

                    }else{ // false validation
                        $errorMsg.append("<p class='error_message'>" + data.msg + "</p>");
                        $("#new_email").focus();
                        $overlay.hide();
                    }
                }//success
            });//ajax

            return false;
        }
    });
});

function validate_login(){

    var emailaddressVal = $("#username").val();
    var passwordVal = $("#password").val();
    var $message = $('#message');

    if(emailaddressVal == '' && passwordVal == '') {
        $message.html('<p class="login-error">Please enter your email address and password.</p>');
    }
    else if(emailaddressVal == '') {
        $message.html('<p class="login-error">Please enter your email address.</p>');
    }
    else if (passwordVal == '') {
        $message.html('<p class="login-error">Please enter a password.</p>');
    }
    else {
        var serializedData = $('#login').serialize();
        
        $.ajax({
            type: 'POST',
            url: "<?=Ihub_Config::get()->retrieve('main', 'secure_base_url')?>front/ajax_login_validation",
            async: false,
            data: serializedData,
            dataType: "json",
            success: function(data, textStatus, errorThrown){
                if(data.result == 'valid') {
                    $('#login').submit();
                    return true;
                } else if(data.result == 'already_connected'){
                    /* Redirect the user to MA*/
                    window.location.href = data.redirect_url;
                } else {
                    var resultHtml = '<p class="login-error">' + data.error_msg + '</p>';

                    $message.html(resultHtml);
                    return false;
                }
            },
            error: function(qXHR, textStatus, errorThrown){
                var resultHtml = '<p class="login-error">There was an error please submit form again.</p>';
                $message.html(resultHtml);
                return false;
            }
        });
    }
}

function doForgotPassword(){

    $("#message_forgot").html();

    var action = "<?=Ihub_Config::get()->retrieve('main', 'secure_base_url')?>front/forgot_password_ajax";
    var form_data = {
        email: $("#username_forgot").val(),
        forgot_password: 1,
        is_ajax: 1
    };

    $.ajax({
        type: "POST",
        url: action,
        data: form_data,
        success: function(response)
        {
            $("#bt_signin").html("Submit");

            if(response == 'Your password has been sent to your email.') {
                $("#message_forgot").html("<p class='forgot-success'>"+ response +"</p>");
                $("#bt_signin").html("Submit");
            }
            else {
                $("#message_forgot").html("<p class='forgot-error'>"+ response +"</p>");
                $("#bt_signin").html("Submit");
            }
        },
        error:function(jqXHR, textStatus, errorThrown){
            var resultHtml = '<p class="login-error">There was an error please submit form again.</p>';
            $('#message_forgot').html(resultHtml);
            return false;
        }
    });

    return false;
}