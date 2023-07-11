import { menuArray } from "/data.js";
const itemRender = document.getElementById("item-render");
const orderRender = document.getElementById("order-render");
const totalPriceEl = document.getElementById("total-price");
const orderContainer = document.getElementById("order-container");
const cardDetailsEl = document.getElementById("cardDetails");

document.addEventListener("click", (e) => {
  if (e.target.id) {
    if (e.target.id === "btn") {
      afterOrderFunction();
    } else if (e.target.id === "order-btn") {
      e.preventDefault();
      orderCompletionFunction();
    }
  } else if (e.target.dataset) {
    orderRenderFunction(e.target.dataset);
  }
});

function renderItem() {
  let htmllist = "";
  menuArray.forEach((item) => {
    htmllist += `
         <div class="container">
                <img src="${item.icon}" alt="${item.alt}" class="icon">
                <div class="item-info">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients.toString()}</p>
                    <h3>$${item.price}</h3>
                </div>
                <img src="/images/plus-icon.png" alt="plus icon" class="plus-icon" 
                data-order=${item.name}>
            </div>
            <hr>
        `;
  });
  itemRender.innerHTML = htmllist;
}
renderItem();

let Pizza = 0;
let Hamburger = 0;
let Beer = 0;

function orderRenderFunction(orderValue) {
  function orderCalculation(item, value) {
    if (item === "Pizza") {
      if (value > 0) {
        Pizza += value;
      } else if ((value < 0) & (Pizza > 0)) {
        Pizza += value;
      }
    } else if (item === "Hamburger") {
      if (value > 0) {
        Hamburger += value;
      } else if ((value < 0) & (Hamburger > 0)) {
        Hamburger += value;
      }
    } else if (item === "Beer") {
      if (value > 0) {
        Beer += value;
      } else if ((value < 0) & (Beer > 0)) {
        Beer += value;
      }
    }
  }

  function ordervalueCheck() {
    if ((Pizza === 0) & (Hamburger === 0) & (Beer === 0)) {
      orderContainer.style.display = "none";
    }
  }

  if (orderValue.order) {
    orderContainer.style.display = "initial";
    // itemRender.style.backgroundColor = "#f5f5f5"
    orderCalculation(orderValue.order, 1);
  } else if (orderValue.cancelOrder) {
    orderCalculation(orderValue.cancelOrder, -1);
    ordervalueCheck();
  }

  let orderList = "";
  let numOfOrder = 0;
  let totalprice = 0;
  menuArray.forEach((item) => {
    if (item.name === "Pizza") {
      numOfOrder = Pizza;
    } else if (item.name === "Hamburger") {
      numOfOrder = Hamburger;
    } else if (item.name === "Beer") {
      numOfOrder = Beer;
    }

    orderList += `
        <div class="flex">
            <p class="order-item">${item.name}</p>
            <p class="remove-item" data-cancel-order=${item.name} >remove</p>
            <p class="price"><span class="priceCal">${numOfOrder} x $${
      item.price
    }</span> $${item.price * numOfOrder}</p>
        </div>
        `;
    totalprice += item.price * numOfOrder;
  });
  orderRender.innerHTML = orderList;
  totalPriceEl.textContent = `$${totalprice}`;
}

function afterOrderFunction() {
  cardDetailsEl.style.display = "initial";
  itemRender.style.backgroundColor = "#f5f5f5";
}

function orderCompletionFunction() {
  const orderData = new FormData(cardDetailsEl);
  cardDetailsEl.style.display = "none";
  itemRender.style.backgroundColor = "#fff";

  orderContainer.innerHTML = `
    <div id="thanksMessage" >
        <p> Thanks, ${orderData.get("cusName")} Your order is on its way!  </p>
    </div>
    `;
}
