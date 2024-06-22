
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


const jobs = [
    {
        image: "job1.jpg",
        category: "Programming & Tech",
        text: "C++ Projects"
    },
    {
        image: "job2.jpeg",
        category: "Programming & Tech",
        text: "Java Projects"
    },
    
];

jobs.forEach((job) => {
    const cardElement = document.createElement("div");
    cardElement.className = "cards";

    const imagesDiv = document.createElement("div");
    imagesDiv.className = "images-div";
    imagesDiv.innerHTML = `<img src="images/jobs/${job.image}">`;
    cardElement.appendChild(imagesDiv);

    const cardType = document.createElement("div");
    cardType.className = "cardType";
    cardType.textContent = job.category;
    cardElement.appendChild(cardType);

    const cardText = document.createElement("div");
    cardText.className = "cardText";
    cardText.innerHTML = `<a href="/service-view">${job.text}</a>`;
    cardElement.appendChild(cardText);

    document.querySelector(".jobs-div").appendChild(cardElement);
});