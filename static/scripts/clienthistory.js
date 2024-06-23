const orders = [
  {
    imageUrl: "images/jobs/webDev.jpeg",
    type: "Programming & Tech",
    link: "Web Development",

  },
  {
    imageUrl: "images/jobs/audio1.jpeg",
    type: "Programming & Tech",
    link: "Web Development",
  },
  {
    imageUrl: "images/jobs/webDev.jpeg",
    type: "Programming & Tech",
    link: "Web Development",
  }
];






function createOrderCard(order) {
  const cardHTML = `
    <div class="orders-card">
      <div class="images-div">
        <img src="${order.imageUrl}">
      </div>
      <div class="cardType">
        <p id="cardtxt">type:</p>
        <p>${order.type}</p>
      </div>
      <div class="cardText">
        <a href="#" class="acard">${order.link}</a>
        </div>
      </div>
    </div>
    <hr>
  `;
  return cardHTML;
}


function renderOrderCards() {
  const prevOrdersDiv = document.getElementById("prev-orders");
  prevOrdersDiv.innerHTML = "";

  orders.forEach(order => {
    const orderCard = createOrderCard(order);
    prevOrdersDiv.innerHTML += orderCard;
  });
}

renderOrderCards();