const cartCounter = () => {
  let total = 0
  let count = 0
  const items = {}
  const totalContainer = document.querySelector(".cart-total-container")
  const cartTotal = document.getElementById("cartTotal")
  const itemCount = document.getElementById("itemCount")
  const itemTotal = document.querySelector(".item-total")
  const itemsContainer = document.querySelector(".cart-items-container")
  const cart = document.getElementById("cart")
  const clearCartBtn = document.getElementById("clearCartBtn")
  const checkoutBtn = document.getElementById("checkoutBtn")

  const showCartInfo = function() {
    cartTotal.textContent = total.toFixed(2)
    itemTotal.textContent = cartTotal.textContent
    itemCount.textContent = count
  }

  const clearCart = function() {
    Object.keys(items).forEach(key => delete items[key])
    itemsContainer.innerHTML = ""
    count = 0
    total = 0
    showCartInfo()
  }

  itemsContainer.addEventListener("click", (event) => {
    const cartItem = event.target.closest(".cart-item")
    const key = cartItem.dataset.key
    const clickedItemCount = items[key]
    const clickedItemPrice = +cartItem.dataset.price

    if (event.target.matches(".cart-item-remove")) {
      count = Math.max(0, count - clickedItemCount)
      total = Math.max(0, total - clickedItemCount * clickedItemPrice)
      delete items[key]
      cartItem.remove()
    } else if (event.target.matches(".cart-item-boost")) {
      count += 1
      total += clickedItemPrice
      items[key] += 1
      cartItem.querySelector(".cart-item-count").textContent = items[key]
    }
    showCartInfo()
  })

  clearCartBtn.addEventListener("click", clearCart)

  checkoutBtn.addEventListener("click", () => {
    if (Object.keys(items).length < 1) {
      alert('Fill your cart!')
      return
    }
    const cartContent = {
      count,
      total,
      items,
      client: "John Doe",
      date: new Date(),
    }
    alert('Check out the console \n' + JSON.stringify(cartContent))
    console.log(JSON.stringify(cartContent))
    clearCart()
 })



  // function adds new item to the cart
  return function ({ itemName, itemUrl, itemPrice }) {
    const key = itemName.split(" ")[0].trim() + itemPrice
    items[key] = (items[key] ?? 0) + 1
    count += 1
    total += itemPrice
    showCartInfo()

    const cartElt = document.querySelector(`[data-key="${key}"]`)
    if (cartElt !== null) {
      cartElt.querySelector(".cart-item-count").textContent = items[key]
    } else {
      const template = document.getElementById("cart-item-template")

      const clone = template.content.cloneNode(true)
      clone.querySelector(".cart-item-name").textContent = itemName
      clone.querySelector(".cart-item-price").textContent = itemPrice.toFixed(2)
      clone.querySelector(".cart-item-img").src = itemUrl
      clone.querySelector(".cart-item").dataset.price = itemPrice
      clone.querySelector(".cart-item-count").textContent = items[key]
      clone.querySelector("[data-key]").setAttribute("data-key", key)
      itemsContainer.append(clone)
    }
    alert(`${itemName} is added to your cart!`)
  }
}

export { cartCounter }
