function initGallery(imageList) {
   const thumbnailWrapper = document.querySelector(".thumbnail");
   const mainImage = document.querySelector(".mainImage");

   thumbnailWrapper.innerHTML = "";
   mainImage.innerHTML = `<img src="${imageList[0]}" class="img-fluid">`;

   imageList.forEach((src, index) => {
      const thumb = document.createElement("div");
      thumb.className = `thumbnailBox${index === 0 ? " active" : ""}`;
      thumb.innerHTML = `<img src="${src}" class="img-fluid">`;
      thumbnailWrapper.appendChild(thumb);

      thumb.addEventListener("click", () => {
         mainImage.innerHTML = `<img src="${src}" class="img-fluid">`;
         document.querySelectorAll(".thumbnailBox").forEach(el => el.classList.remove("active"));
         thumb.classList.add("active");
      });
   });

   mainImage.addEventListener("mousemove", (e) => {
      const img = mainImage.querySelector("img");
      const rect = mainImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      img.style.transform = `translate(${(mainImage.offsetWidth / 2 - x) * 2}px, ${(mainImage.offsetHeight / 2 - y) * 2}px) scale(3)`;
   });

   mainImage.addEventListener("mouseleave", () => {
      const img = mainImage.querySelector("img");
      img.style.transform = "translate(0, 0) scale(1)";
   });
}
