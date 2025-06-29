document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.accordion-body input').forEach(input => {
    input.addEventListener('change', filterProducts);
  });
});

function getSelectedFilters() {
  const sortValue = document.querySelector('input[name="sort"]:checked')?.id;

  const selectedSizes = [...document.querySelectorAll('#vibeVSize input:checked')]
    .map(el => el.value);
  const selectedTags = [...document.querySelectorAll('#vibeVTag input:checked')]
    .map(el => el.value);
  const selectedColors = [...document.querySelectorAll('#vibeVColor input:checked')]
    .map(el => el.value.toLowerCase());

  return { sortValue, selectedSizes, selectedTags, selectedColors };
}

function filterProducts() {
  const { sortValue, selectedSizes, selectedTags, selectedColors } = getSelectedFilters();

  if (typeof allShopProducts === 'undefined') {
    console.error("allShopProducts is not defined.");
    return;
  }

  let filtered = [...allShopProducts];

  // Filter by size
  if (selectedSizes.length > 0) {
    filtered = filtered.filter(product =>
      selectedSizes.includes(product.size?.toUpperCase()) // Case safety
    );
  }

  // Filter by tag/category
  if (selectedTags.length > 0) {
    filtered = filtered.filter(product =>
      selectedTags.includes(product.tag)
    );
  }

  // Filter by color (safe handling)
  if (selectedColors.length > 0) {
    filtered = filtered.filter(product =>
      Array.isArray(product.colors) &&
      product.colors.some(color =>
        color?.code && selectedColors.includes(color.code.toLowerCase())
      )
    );
  }

  // Sorting
  if (sortValue === "lowToHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "highToLow") {
    filtered.sort((a, b) => b.price - a.price);
  }

  // Render products
  if (typeof renderProducts === 'function') {
    renderProducts(filtered);
  } else {
    console.error("renderProducts() function not found.");
  }
}
