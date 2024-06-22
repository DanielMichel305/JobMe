let topbar = document.getElementById("topbar");
let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        document.getElementById("searchButton").click();
    }
});
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
    if(isOverflowing(document.getElementById("topbar"))){
        let calcWidth = body.offsetWidth - 750;
        searchBar.style.width = calcWidth + "px";
    }
    if((searchBar.offsetWidth > (topbar.offsetWidth * 0.47))){
        searchBar.style.width = "700px";
    }
    //console.log(searchBar.offsetWidth);
}
body.onresize();
//end



//custome menue for profile
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
 
    // Close the dropdown if the user clicks anywhere else
    window.addEventListener('click', function (e) {
        if (!select.contains(e.target)) {
            selectItems.style.display = 'none';
        }
    });
});