const allBlogPosts = [
  {
    id: "B001",
    title: "Cotton",
    shortDesc: "We source certified organic cotton—grown without harmful pesticides and using significantly less water.",
    fullDesc: `At VibeVogue, we source certified organic cotton—grown without harmful pesticides or fertilizers, and using significantly less water than conventional cotton. By avoiding toxic pesticides, we also preserve biodiversity and protect the health and well-being of farming communities.`,
    image: "images/blog1.png",
    date: "September 2024"
  },
  {
    id: "B002",
    title: "Wool",
    shortDesc: "Natural wool with performance qualities—durability and moisture-wicking.",
    fullDesc: `We use natural wool for its exceptional performance qualities—temperature regulation, durability, and natural moisture-wicking ability. Our wool is responsibly biodegraded, making it an environmentally conscious choice.`,
    image: "images/blog2.png",
    date: "September 2024"
  },
  {
    id: "B003",
    title: "Linen",
    shortDesc: "Flax-sourced linen is sustainable, low water usage, and biodegradable.",
    fullDesc: `Sourced from thoughtfully managed flax crops, linen requires less water and fewer pesticides. It’s also easier to biodegrade compared to cotton or polyester.`,
    image: "images/blog3.png",
    date: "September 2024"
  },
  {
    id: "B004",
    title: "Silk",
    shortDesc: "Timeless beauty, low environmental impact, and eco-conscious dyeing.",
    fullDesc: `Luxe and adaptable, silk is valued for both its timeless beauty and low environmental footprint. Our suppliers follow low-energy practices and use fewer dyes to reduce water pollution and carbon emissions.`,
    image: "images/blog4.png",
    date: "September 2024"
  },
  {
    id: "B005",
    title: "Cashmere",
    shortDesc: "Ethically sourced with focus on traceability and animal welfare.",
    fullDesc: `We proudly source our cashmere through the Good Cashmere Standard. The key is traceable production—ensuring animal welfare, local economic resilience, and the wellbeing of knitting communities.`,
    image: "images/blog5.png",
    date: "September 2024"
  }
];

// Expose globally
window.allBlogPosts = allBlogPosts;





// blog.js

// Loop through and render blogs
function renderAllBlogs(containerId) {
  const container = document.getElementById(containerId);
  if (!container || !window.allBlogPosts) {
    // console.error("[Blog] Blog container or blog data missing.");
    return;
  }

  const blogCards = allBlogPosts.map(blog => {
    return `
      <div class="row align-items-center mb-5 ${blog.id.endsWith("2") || blog.id.endsWith("4") ? 'flex-md-row-reverse' : ''}">
        <div class="col-md-4">
          <img src="${blog.image}" alt="${blog.title}" class="img-fluid rounded">
        </div>
        <div class="col-md-8">
          <h5 class="fw-bold">${blog.title}</h5>
          <small class="text-muted d-block mb-2">Admin &nbsp;·&nbsp; ${blog.date}</small>
          <p class="mb-2">${blog.shortDesc}</p>
          <a href="bloginner.html?id=${blog.id}" class="text-decoration-none fw-medium">Read More →</a>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = blogCards;
}

// Call this function after DOM loaded
window.addEventListener("DOMContentLoaded", () => {
  renderAllBlogs("blogContainer");
});
