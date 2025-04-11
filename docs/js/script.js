import { cartCounter } from "./cart.js"
import { qs, handleSearchFilter } from "./filter.js"

const navLinks = qs("#navLinks")
navLinks.addEventListener("click", () => {
  navLinks.classList.add("hide-s")
})

qs("#cart-info").addEventListener("click", () => {
  qs("#cart").classList.toggle("cart-show")
  navLinks.classList.add("hide-s")
})

qs("#navbar-toggle").addEventListener("click", () => {
  qs("#cart").classList.remove("cart-show")
  navLinks.classList.toggle("hide-s")
})

// Create store cards
const inStore = [
  {
    variety: "cakes",
    name: "cake item",
    price: 5,
    url: "img/cake-1.jpeg",
  },
  {
    variety: "cakes",
    name: "cake item",
    price: 10,
    url: "img/cake-2.jpeg",
  },
  {
    variety: "cakes",
    name: "cake item",
    price: 15,
    url: "img/cake-3.jpeg",
  },
  {
    variety: "cupcakes",
    name: "cupcake item",
    price: 5,
    url: "img/cupcake-1.jpeg",
  },
  {
    variety: "cupcakes",
    name: "cupcake item",
    price: 10,
    url: "img/cupcake-2.jpeg",
  },
  {
    variety: "cupcakes",
    name: "cupcake item",
    price: 15,
    url: "img/cupcake-3.jpeg",
  },
  {
    variety: "sweets",
    name: "sweet item",
    price: 5,
    url: "img/sweets-1.jpeg",
  },
  {
    variety: "sweets",
    name: "sweet item",
    price: 10,
    url: "img/sweets-2.jpeg",
  },
  {
    variety: "sweets",
    name: "sweet item",
    price: 15,
    url: "img/sweets-3.jpeg",
  },
  {
    variety: "doughnuts",
    name: "doughnut item",
    price: 5,
    url: "img/doughnut-1.jpeg",
  },
  {
    variety: "doughnuts",
    name: "doughnut item",
    price: 10,
    url: "img/doughnut-2.jpeg",
  },
  {
    variety: "doughnuts",
    name: "doughnut item",
    price: 15,
    url: "img/doughnut-3.jpeg",
  },
]

const storeShowcase = document.getElementById("storeShowcase")
const storeCard = document.getElementById("store-card-template")
inStore.forEach(one => {
  const clone = storeCard.content.cloneNode(true)
  clone.querySelector(".store-item-name").textContent = one.name[0].toUpperCase() + one.name.slice(1)
  clone.querySelector(".store-item-price").textContent = one.price
  clone.querySelector(".card-image").src = one.url
  const storeItem = clone.querySelector(".store-item")
  storeItem.dataset.variety = one.variety
  storeItem.dataset.name = one.name
  storeItem.dataset.price = one.price

  storeShowcase.append(clone)
})


handleSearchFilter()
const addToCart = cartCounter()

storeShowcase.addEventListener("click", (event) => {
  const storeItem = event.target.closest(".store-item")
  if (storeItem) {
    const getValueOf = (selector) => storeItem.querySelector(selector)
    const chosenItem = {
      itemName: getValueOf(".store-item-name").textContent,
      itemPrice: parseFloat(
        getValueOf(".store-item-price").textContent
      ),
      itemUrl: getValueOf(".card-image").src,
    }
    addToCart(chosenItem)
    /* addToCart({
        itemName: "Cake",
        itemPrice: 20,
        itemUrl: "img/cake-1.jpeg",
       })
    */
  }
})
