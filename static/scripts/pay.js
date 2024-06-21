

document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('form[name="paymentform"]');

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Form submitted");

        var isValid = pay_validation(form);
        console.log("Form validity:", isValid);

        if (isValid) {
            // form.submit(); // 
            console.log("Form validity after:", isValid);
        }
    });
});

function displayerror(elemId, errormsg) {
    var element = document.getElementById(elemId);
    if (element) {
        element.innerHTML = errormsg;
    } else {
        console.error("Element with id '" + elemId + "' not found.");
    }
}


function pay_validation(form) {
    var name = form.name.value;
    var cvv = form.cvv.value;
    var card = form.card.value;
    var months = form.months.value;
    var years = form.years.value;

    var nameErr = cvvErr = cardErr = expErr = true;

    // Validation for Name
    if (name === "") {
        displayerror("nameErr", "Owner name is required");
    } else {
        var namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(name)) {
            displayerror("nameErr", "Please enter a valid name");
        } else {
            displayerror("nameErr", "");
            nameErr = false;
        }
    }

    // Validation for CVV
    if (cvv === "") {
        displayerror("cvvErr", "CVV is required");
    } else {
        var cvvPattern = /^[0-9]{3}$/;
        if (!cvvPattern.test(cvv)) {
            displayerror("cvvErr", "Please enter a valid 3-digit CVV number");
        } else {
            displayerror("cvvErr", "");
            cvvErr = false;
        }
    }

    // Validation for Card Number
    if (card === "") {
        displayerror("cardErr", "Card number is required");
    } else {
        var cardPattern = /^[0-9]{16}$/;
        if (!cardPattern.test(card)) {
            displayerror("cardErr", "Please enter a valid 16-digit card number");
        } else {
            displayerror("cardErr", "");
            cardErr = false;
        }
    }

    // Validation for Expiry Date
    if (months === "Select" || years === "Select") {
        displayerror("expErr", "Please select expiry date");
    } else {
        displayerror("expErr", "");
        expErr = false;
    }

    
    return !(nameErr || cvvErr || cardErr || expErr);
}
