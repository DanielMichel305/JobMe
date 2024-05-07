
//custome menues for filters
let filter_customSelects = document.querySelectorAll('.filters-custom-select');
 
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
 
    // Close the dropdown if the user clicks anywhere else
    window.addEventListener('click', function (e) {
        if (!select.contains(e.target)) {
            selectItems.style.display = 'none';
        }
    });
});
//end