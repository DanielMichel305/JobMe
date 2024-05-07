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


    if(password == "") {
        displayerror("passwordErr", "Your password is missing");
    } else {
        var pattern = /^.{8,}$/;               
        if(pattern.test(password) === false) {
            displayerror("passwordErr", "Enter a valid password of atleast 8 charecters");
        } else {
            displayerror("passwordErr", "");
            lastnameErr = false;
        }
    }

    /////

    if(confpassword == "") {
        displayerror("confpasswordErr", "Your password is missing");
    } else {
                      
        if(confpassword != password) {
            displayerror("confpasswordErr", "Your password doesnt match the original one");
        } else {
            displayerror("confpasswordErr", "");
            lastnameErr = false;
        }
    }


    /////
    if(mobile == "") {
        displayerror("mobileErr", "Your mobile number is missing");
    } else {
        var pattern = /^[0]\d{10}$/;
        if(pattern.test(mobile) === false) {
            displayerror("mobileErr", "Enter a 11 digit mobile number,starting with 0");
        } else{
            displayerror("mobileErr", "");
            mobileErr = false;
        }
    }


////
    if(gender == "") {
        displayerror("genderErr", "Please select your gender");
    } else {
        displayerror("genderErr", "");
        genderErr = false;
    }

    ////

    if(category == "") {
        displayerror("categoryErr", "Please select your category");
    } else {
        displayerror("categoryErr", "");
        categoryErr = false;
    }

///////

    if((nameErr || emailErr || mobileErr || categoryErr || genderErr || lastnameErr || confpasswordErr) == true) {
        return false;
    }
    else{
        return true;
    }
    
    
}