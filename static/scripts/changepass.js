
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('form[name="changepass"]');

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Form submitted");

        var isValid = validatepass(form);
        console.log("Form validity:", isValid);
        if (isValid) {
            form.submit();
        }
    });
});



function displayerror(elemId, errormsg) {
    document.getElementById(elemId).innerHTML = errormsg;
}

////////  the passwprd form validation   ////////////

function validatepass(form) {
    var curpass = form.curpass.value;
    var newpass = form.newpass.value;
    var reppass = form.reppass.value;

    var curpassErr = newpassErr = reppassErr = true;

    if (curpass == "") {
        displayerror("curpassErr", "Current password is missing");
    } else {
        displayerror("curpassErr", "");
        curpassErr = false;
    }



    if (newpass == "") {
        displayerror("newpassErr", "New password is missing");
    } else {
        var pattern = /^.{8,}$/;               
        if(pattern.test(newpass) === false) {
            displayerror("newpassErr", "Enter a valid password of atleast 8 charecters");
        } else {
            displayerror("newpassErr", "");
            newpassErr = false;
        }
    }

    if (reppass == "") {
        displayerror("reppassErr", "New password is missing");
    } else if (reppass !== newpass) {
        displayerror("reppassErr", "Passwords do not match");
    } else {
        displayerror("reppassErr", "");
        reppassErr = false;
    }


    if (curpassErr || newpassErr || reppassErr == true) {
        return false;
    } else {
        return true;
    }
}
