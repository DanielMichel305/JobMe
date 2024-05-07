document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchBar-search-sb").addEventListener("focus", function() {
        document.getElementById('searchBar-container').style.boxShadow= "0 0 5px #27cbff";
    });
    document.getElementById("searchBar-search-sb").addEventListener("blur", function() {
        document.getElementById('searchBar-container').style.boxShadow= "none";
    });
 
});

