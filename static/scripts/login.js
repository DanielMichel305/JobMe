document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('form[name="loginform"]');

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (true) {
            form.submit();
        }
    });
});