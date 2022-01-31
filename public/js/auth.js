$("body").on("contextmenu", "img", function(e) {
    return false;
});
$('img').attr('draggable', false);
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
"use strict";
// Class Definition
var KTLogin = function() {
    var _login;
    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';
        _login.removeClass('login-forgot-on');
        _login.removeClass('login-signup-on');
        _login.removeClass('login-signin-on');
        _login.addClass(cls);
        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }
    var _handleSignInForm = function() {
        var validation;
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_signin_form'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Harap masukkan Email'
							},
                            emailAddress: {
								message: 'Inputan bukan alamat email yang valid'
							}
						}
					},
					password: {
						validators: {
							notEmpty: {
								message: 'Harap masukkan Password'
							}
						}
					}
				},
				plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);
        $('#kt_login_signin_submit').on('click', function (e) {
            e.preventDefault();
            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                    login_data = {
                        email: $("#email").val(),
                        password: $("#password").val()
                    };
                    $.ajax({
                        type: "POST",
                        url: "auth/login",
                        data: login_data,
                        dataType: 'json',
                        success: function (response) {
                            if (response.alert == "success") {
                                swal.fire({
                                    text: response.message,
                                    icon: response.alert,
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }
                                }).then(function() {
                                    location.reload();
                                });
                            } else {
                                swal.fire({
                                    text: response.message,
                                    icon: response.alert,
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }
                                });
                            }
                        }
                    });
				} else {
					swal.fire({
                        text: response.message,
                        icon: response.alert,
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    });
				}
		    });
        });
        $('#kt_login_forgot').on('click', function (e) {
            e.preventDefault();
            _showForm('forgot');
        });
        $('#kt_login_signup').on('click', function (e) {
            e.preventDefault();
            _showForm('signup');
        });
    }
    var _handleSignUpForm = function(e) {
        var validation;
        var form = KTUtil.getById('kt_login_signup_form');

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			form,
			{
				fields: {
					name: {
						validators: {
							notEmpty: {
								message: 'Harap masukkan nama'
							}
						}
					},
					role: {
						validators: {
							notEmpty: {
								message: 'Harap pilih role'
							}
						}
					},
					phone: {
						validators: {
							notEmpty: {
								message: 'Harap masukkan No HP'
							}
						}
					},
					address: {
						validators: {
							notEmpty: {
								message: 'Harap masukkan Alamat'
							}
						}
					},
					email: {
                        validators: {
							notEmpty: {
								message: 'Harap masukkan Email'
							},
                            emailAddress: {
								message: 'Inputan bukan alamat email yang valid'
							}
						}
					},
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'Harap masukkan password'
                            }
                        }
                    },
                    cpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Harap masukkan konfirmasi password'
                            },
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'Kata sandi dan konfirmasinya tidak sama'
                            }
                        }
                    },
                    agree: {
                        validators: {
                            notEmpty: {
                                message: 'Anda harus menerima syarat dan ketentuan'
                            }
                        }
                    },
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        $('#kt_login_signup_submit').on('click', function (e) {
            e.preventDefault();

            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                    let data = $("#kt_login_signup_form").serialize();
                    $("#kt_login_signup_submit").prop("disabled", true);
                    $.ajax({
                        type: "POST",
                        url: "auth/register",
                        data: data,
                        dataType: 'json',
                        beforeSend: function() {

                        },
                        success: function(response) {
                            $("#kt_login_signup_submit").prop("disabled", false);
                            if (response.alert == "success") {
                                swal.fire({
                                    text: response.message,
                                    icon: response.alert,
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }
                                }).then(function() {
                                    _showForm('signin');
                                });
                                $(form)[0].reset();
                            } else {
                                swal.fire({
                                    text: response.message,
                                    icon: response.alert,
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }
                                }).then(function() {
                                    KTUtil.scrollTop();
                                });
                            }
                        },
                    });
				} else {
					swal.fire({
		                text: "Sorry, looks like there are some errors detected, please try again.",
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
                        customClass: {
    						confirmButton: "btn font-weight-bold btn-light-primary"
    					}
		            }).then(function() {
						KTUtil.scrollTop();
					});
				}
		    });
        });

        // Handle cancel button
        $('#kt_login_signup_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }
    var _handleForgotForm = function(e) {
        var validation;

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_forgot_form'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Harap masukkan Email'
							},
                            emailAddress: {
								message: 'The value is not a valid email address'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        // Handle submit button
        $('#kt_login_forgot_submit').on('click', function (e) {
            e.preventDefault();

            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                    forgot_data = {
                        email: $("#f_email").val(),
                    };
                    $.ajax({
                        type: "POST",
                        url: "auth/forgot",
                        data: forgot_data,
                        dataType: 'json',
                        success: function (response) {
                            if (response.alert == "success") {
                                swal.fire({
                                    text: response.message,
                                    icon: response.alert,
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }
                                }).then(function() {
                                    _showForm('signin');
                                });
                            } else {
                                swal.fire({
                                    text: response.message,
                                    icon: response.alert,
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }
                                });
                            }
                        }
                    });
                    // Submit form
                    KTUtil.scrollTop();
				} else {
					swal.fire({
		                text: "Sorry, looks like there are some errors detected, please try again.",
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
                        customClass: {
    						confirmButton: "btn font-weight-bold btn-light-primary"
    					}
		            }).then(function() {
						KTUtil.scrollTop();
					});
				}
		    });
        });

        // Handle cancel button
        $('#kt_login_forgot_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }
    // Public Functions
    return {
        // public functions
        init: function() {
            _login = $('#kt_login');
            _handleSignInForm();
            _handleSignUpForm();
            _handleForgotForm();
        }
    };
}();
// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});