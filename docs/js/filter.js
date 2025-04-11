const qs = (selector) => {
  if (selector.startsWith("#")) {
    return document.querySelector(selector)
  }
  return document.querySelectorAll(selector)
}

const handleSearchFilter = function () {
  const DEBOUNCE_DELAY = 500

  const searchForm = qs("#searchForm")
  const filterButtons = qs("#filterButtons")
  const searchFilterInput = qs("#searchFilter")

  const filter = () => {
    const storeItems = qs(".store-item")
    const formData = new FormData(searchForm)
    const searchFilter = formData.get("searchFilter").toLocaleLowerCase().trim()
    const varieties = formData.getAll("variety")
    
    if (!searchFilter && varieties.length === 0) {
      storeItems.forEach((storeItem) => {
        storeItem.classList.remove("hide")
      })
      return
    }
    
    storeItems.forEach((storeItem) => {
      storeItem.classList.remove("hide")

      // Filter store by variety buttons
      if (
        varieties.length > 0 &&
        !varieties.includes(storeItem.dataset.variety.toLowerCase())
      ) {
        storeItem.classList.add("hide")
        return
      }

      // Filter store with text search
      if (
        searchFilter &&
        (!storeItem.textContent.includes(searchFilter) ||
        (storeItem.dataset.name !== undefined &&
        !storeItem.dataset.name.toLowerCase().includes(searchFilter)))
      ) {
        storeItem.classList.add("hide")
      }
    })
    window.scrollTo(0, filterButtons.offsetTop)
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    filter()
  })

  searchFilterInput.addEventListener("input", (event) => {
    // Debounce decorator
    function debounce(func, ms) {
      let timeout
      return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          return func.apply(this, arguments)
        }, ms)
      }
    }

    const debouncedFilter = debounce(filter, DEBOUNCE_DELAY)
    debouncedFilter()
  })

  filterButtons.addEventListener("click", (event) => {
    if (!event.target.matches(".filter-btn")) {
      return
    }
    if (event.target?.value?.toLowerCase() === "all") {
      // Deselect all checkboxes by setting the 'checked' property to false
      const checkboxes = filterButtons.querySelectorAll('[type="checkbox"]')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })
    }
    filter()
  })
}

export { qs, handleSearchFilter }
