document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector('form[name="registerform"]');

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var isValid = reg_validation(form);
        console.log("Form validity before: " + isValid);

        if (isValid) {
            // form.submit(); // Uncomment this line to allow form submission
            console.log("Form validity after: " + isValid);
        }
    });
});

function displayerror(elemId, errormsg) {
    document.getElementById(elemId).innerHTML = errormsg;
}

function reg_validation(form) {
    var name = form.name.value.trim();
    var lastname = form.lastname.value.trim();
    var email = form.email.value.trim();
    var mobile = form.mobile.value.trim();
    var category = form.category.value;
    var gender = form.gender.value;
    var password = form.password.value.trim();
    var confpassword = form.confpassword.value.trim();

    var nameErr = true;
    var lastnameErr = true;
    var emailErr = true;
    var mobileErr = true;
    var categoryErr = true;
    var genderErr = true;
    var passwordErr = true;
    var confpasswordErr = true;

    if (name === "") {
        displayerror("nameErr", "Your name is missing");
    } else {
        var pattern = /^[a-zA-Z\s]+$/;
        if (!pattern.test(name)) {
            displayerror("nameErr", "Please enter a valid name");
        } else {
            displayerror("nameErr", "");
            nameErr = false;
        }
    }

    if (lastname === "") {
        displayerror("lastnameErr", "Your last name is missing");
    } else {
        var pattern = /^[a-zA-Z\s]+$/;
        if (!pattern.test(lastname)) {
            displayerror("lastnameErr", "Please enter a valid name");
        } else {
            displayerror("lastnameErr", "");
            lastnameErr = false;
        }
    }

    if (email === "") {
        displayerror("emailErr", "Your email address is missing");
    } else {
        var pattern = /^\S+@\S+\.\S+$/;
        if (!pattern.test(email)) {
            displayerror("emailErr", "Please enter a valid email address");
        } else {
            displayerror("emailErr", "");
            emailErr = false;
        }
    }

    if (password === "") {
        displayerror("passwordErr", "Your password is missing");
    } else {
        var pattern = /^.{8,}$/;
        if (!pattern.test(password)) {
            displayerror("passwordErr", "Enter a valid password of at least 8 characters");
        } else {
            displayerror("passwordErr", "");
            passwordErr = false;
        }
    }

    if (confpassword === "") {
        displayerror("confpasswordErr", "Your password is missing");
    } else {
        if (confpassword !== password) {
            displayerror("confpasswordErr", "Your password doesn't match the original one");
        } else {
            displayerror("confpasswordErr", "");
            confpasswordErr = false;
        }
    }

    if (mobile === "") {
        displayerror("mobileErr", "Your mobile number is missing");
    } else {
        var pattern = /^[0]\d{10}$/;
        if (!pattern.test(mobile)) {
            displayerror("mobileErr", "Enter an 11 digit mobile number, starting with 0");
        } else {
            displayerror("mobileErr", "");
            mobileErr = false;
        }
    }

    if (!form.gender.value) {
        displayerror("genderErr", "Please select your gender");
    } else {
        displayerror("genderErr", "");
        genderErr = false;
    }

    if (!form.category.value) {
        displayerror("categoryErr", "Please select your category");
    } else {
        displayerror("categoryErr", "");
        categoryErr = false;
    }

    if (nameErr || emailErr || mobileErr || categoryErr || genderErr || lastnameErr || passwordErr || confpasswordErr) {
        return false;
    } else {
        return true;
    }

}


