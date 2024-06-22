document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('form[name="gigForm"]');

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (true) {
            form.submit();
        }
    });
});


function updateServiceOptions() {
    var categorySelect = document.getElementById("categorySelect");
    var serviceSelect = document.getElementById("serviceSelect");
    var serviceOptions = serviceSelect.getElementsByTagName("option");

    
    while (serviceOptions.length > 1) {
        serviceSelect.remove(1);
    }

    
    if (categorySelect.value === "PROGRAMMING & TECH") {
        serviceSelect.add(new Option("Website Development"));
        serviceSelect.add(new Option("Mobile App Development"));
        serviceSelect.add(new Option("Software Development"));
    } else if (categorySelect.value === "Graphics & Design") {
        serviceSelect.add(new Option("Logo & Brand Identity"));
        serviceSelect.add(new Option("Visual Design"));
        serviceSelect.add(new Option("Architecture & Building Design"));
    }
    else if (categorySelect.value === "Digital Marketing") {
        serviceSelect.add(new Option("Methods & Techniques"));
        serviceSelect.add(new Option("Analytics & Strategy"));
        serviceSelect.add(new Option("Social"));
    }
    else if (categorySelect.value === "Video & Animation") {
        serviceSelect.add(new Option("Editing & Post-Production"));
        serviceSelect.add(new Option("Animation"));
        serviceSelect.add(new Option("Explainer Videos"));
    }
    else if (categorySelect.value === "Writing & Translation") {
        serviceSelect.add(new Option("Content Writing"));
        serviceSelect.add(new Option("Editing & Critique"));
        serviceSelect.add(new Option("Business & Marketing Copy"));
    }
    else if (categorySelect.value === "Music & Audio") {
        serviceSelect.add(new Option("Music Production & Writing"));
        serviceSelect.add(new Option("Voice Over & Narration"));
        serviceSelect.add(new Option("Sound Design"));
    }
    else if (categorySelect.value === "Business") {
        serviceSelect.add(new Option("Business Management"));
        serviceSelect.add(new Option("Accounting & Finance"));
        serviceSelect.add(new Option("Sales & Customer Care"));
    }
    else if (categorySelect.value === "Consulting") {
        serviceSelect.add(new Option("Business Consultants"));
        serviceSelect.add(new Option("Coaching & Advice"));
        serviceSelect.add(new Option("Mentorship"));
    }
    else if (categorySelect.value === "Data") {
        serviceSelect.add(new Option("Data Science & ML"));
        serviceSelect.add(new Option("Data Analysis"));
        serviceSelect.add(new Option("Data Management"));
    }
    else if (categorySelect.value === "AI Services") {
        serviceSelect.add(new Option("AI Development"));
        serviceSelect.add(new Option("AI Artists"));
        serviceSelect.add(new Option("AI for Businesses"));
    }
    
}

function validateForm() {
    var inputs = document.querySelectorAll('input[type="text"], select'); 

    inputs.forEach(function(input) {
        if (input.value.trim() === '' || input.value === '') { 
            input.style.borderColor = 'red'; 
            input.setAttribute('placeholder', 'Please fill out this field'); 
        } else {
            input.style.borderColor = ''; 
            input.removeAttribute('placeholder');
        }
    });

}

const newGigToggle = document.querySelector('#newgig-toggle');
const newGigContainer = document.querySelector('.container');

newGigToggle.addEventListener('click', function(){

    newGigContainer.classList.toggle('show');

});