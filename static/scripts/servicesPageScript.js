
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
    else if(searchBar.offsetWidth < (calcWidth - 250) ){
        searchBar.style.width = "700px";
    }
    console.log(searchBar.offsetWidth);
}