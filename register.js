document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('form[name="registerform"]');

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var isValid = reg_validation(form);

        if (isValid) {
            form.submit();
        }
    });
});


function displayerror(elemId, errormsg) {
    document.getElementById(elemId).innerHTML = errormsg;
}


function reg_validation(form) {

    var name = form.name.value;
    var lastname =form.lastname.value;
    var email = form.email.value;
    var mobile = form.mobile.value;
    var category = form.category.value;
    var gender = form.gender.value;
    var password=form.password.value;
    var confpassword=form.confpassword.value;


    var nameErr = emailErr = mobileErr = categoryErr = genderErr = lastnameErr =passwordErr = confpasswordErr =true;


    if(name == "") {
        displayerror("nameErr", "Your name is missing");
    } else {
        var pattern = /^[a-zA-Z\s]+$/;                
        if(pattern.test(name) === false) {
            displayerror("nameErr", " Please enter a valid name");
        } else {
            displayerror("nameErr", "");
            nameErr = false;
        }
    }


    ////



    if(lastname == "") {
        displayerror("lastnameErr", "Your last name is missing");
    } else {
        var pattern = /^[a-zA-Z\s]+$/;                
        if(pattern.test(lastname) === false) {
            displayerror("lastnameErr", " Please enter a valid name");
        } else {
            displayerror("lastnameErr", "");
            lastnameErr = false;
        }
    }


    //////


    if(email == "") {
        displayerror("emailErr", "Your email address is missing");
    } else {
        var pattern = /^\S+@\S+\.\S+$/;
        if(pattern.test(email) === false) {
            displayerror("emailErr", "Please enter a valid email address");
        } else{
            displayerror("emailErr", "");
            emailErr = false;
        }
    }

    //////


   
    
}