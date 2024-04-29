//searchbar auto resize
function isOverflowing(el) { 
    let curOverf = el.style.overflow; 
     
    if ( !curOverf || curOverf === "visible" ) 
        el.style.overflow = "hidden"; 
     
    let isOverflowing = el.clientWidth < el.scrollWidth
        || el.clientHeight < el.scrollHeight; 
     
    el.style.overflow = curOverf; 
     
    return isOverflowing; 
} 

let body = document.body;
body.onresize = function(){
    let searchBar = document.getElementById("searchBar");
    let calcWidth = body.offsetWidth - 500;
    if(isOverflowing(document.getElementById("topbar"))){
        searchBar.style.width = calcWidth + "px";
    }
    else if(searchBar.offsetWidth < (calcWidth - 250)){
        searchBar.style.width = "700px";
    }
    //console.log(searchBar.offsetWidth);
}
//end



//custome menue for profile
// Get all custom select elements
let customSelects = document.querySelectorAll('.custom-select');
 
// Attach click event listeners to each custom select
customSelects.forEach(function (select) {
    let selectSelected = select.querySelector('.select-selected');
    let selectItems = select.querySelector('.select-items');
    let options = selectItems.querySelectorAll('div');
 
    // Toggle the dropdown visibility when the select box is clicked
    selectSelected.addEventListener('click', function () {
        if (selectItems.style.display === 'block') {
            selectItems.style.display = 'none';
        } else {
            selectItems.style.display = 'block';
        }
    });
 
    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function (e) {
        if (!select.contains(e.target)) {
            selectItems.style.display = 'none';
        }
    });
});
//end


//custome menues for filters
let filter_customSelects = document.querySelectorAll('.filters-custom-select');
 
// Attach click event listeners to each custom select
filter_customSelects.forEach(function (select) {
    let selectSelected = select.querySelector('.filters-select-selected');
    let selectItems = select.querySelector('.filters-select-items');
    let options = selectItems.querySelectorAll('div');
 
    // Toggle the dropdown visibility when the select box is clicked
    selectSelected.addEventListener('click', function () {
        if (selectItems.style.display === 'block') {
            selectItems.style.display = 'none';
        } else {
            selectItems.style.display = 'block';
        }
    });
 
    // Set the selected option and hide the dropdown when an option is clicked
    options.forEach(function (option) {
        option.addEventListener('click', function () {
            selectSelected.textContent = option.textContent;
            selectItems.style.display = 'none';
        });
    });
 
    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function (e) {
        if (!select.contains(e.target)) {
            selectItems.style.display = 'none';
        }
    });
});