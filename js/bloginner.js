// ✅ Get blog ID from URL
const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

document.addEventListener("DOMContentLoaded", function () {
  const blog = window.allBlogPosts?.find(b => b.id === blogId);

  if (!blog) {
    document.querySelector(".blog-inner-page").innerHTML = "<p>Blog not found.</p>";
    return;
  }

  // ✅ Replace main blog content
  document.querySelector(".blog-inner-banner img").src = blog.image;
  document.querySelector(".blog-inner-content h2").textContent = blog.title;

  // Remove placeholder paragraphs
  document.querySelectorAll(".blog-inner-content p").forEach(p => p.remove());

  // Add full blog content
  const fullPara = blog.fullDesc
    .split("\n")
    .filter(p => p.trim())
    .map(p => `<p>${p.trim()}</p>`)
    .join("");

  document.querySelector(".blog-inner-content").insertAdjacentHTML("beforeend", fullPara);
});


// ✅ Render Related Blogs after DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  const relatedContainer = document.querySelector(".related-blog-section .row");

  if (relatedContainer && Array.isArray(window.allBlogPosts)) {
    const related = window.allBlogPosts
      .filter(b => b.id !== blogId) // exclude current blog
      .slice(0, 3); // show 3 blogs

    relatedContainer.innerHTML = related.map(b => `
      <div class="col-md-4">
        <div class="related-blog-card">
          <img src="${b.image}" alt="${b.title}" class="img-fluid mb-3">
          <h5 class="blog-category">${b.title}</h5>
          <div class="blog-meta text-muted small mb-2">
            ${b.author || "Admin"} • ${b.date || "September 2024"}
          </div>
          <p class="blog-snippet">${b.shortDesc}</p>
          <a href="bloginner.html?id=${b.id}" class="blog-read-more text-decoration-none">Read More &gt;&gt;</a>
        </div>
      </div>
    `).join("");
  }
});




document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("sidebarProductList");

  if (!window.allShopProducts || !container) return;

  const products = window.allShopProducts.slice(0, 3); // Show top 4

  products.forEach(product => {
    const image = product.colors?.[0]?.images?.[0] || "images/placeholder.png";

    const card = document.createElement("div");
    card.className = "product-card mb-3 d-flex align-items-start";
    card.setAttribute("data-id", product.id);
    card.style.cursor = "pointer";

    card.innerHTML = `
      <img src="${image}" alt="${product.name}" class="me-3" style="width: 80px; height: auto;">
      <div>
        <div class="product-title">${product.name}</div>
        <div class="product-price">
          <del>₹${product.originalPrice}</del>
          <strong>₹${product.price}</strong>
        </div>
      </div>
    `;

    // Navigate to product page on click
    card.addEventListener("click", () => {
      window.location.href = `productinner.html?id=${product.id}`;
    });

    container.appendChild(card);
  });
});
