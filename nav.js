window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var searchBar = document.querySelector('.search-bar');
    if (window.scrollY > 50) {
        navbar.classList.add('fixed-navbar');
        searchBar.style.display = 'block';
    } else {
        navbar.classList.remove('fixed-navbar');
        searchBar.style.display = 'none';
    }
});