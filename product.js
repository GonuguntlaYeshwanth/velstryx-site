// Sample product data (you can replace this with a JSON file or API)
const products = {
    "raw-tee": {
      name: "Raw Tee",
      price: "₹1499",
      description: "Comfortable raw cotton tee with minimalist design.",
      images: ["images/shirt1.jpg", "images/shirt2.jpg", "images/shirt3.jpg"]
    },
    "street-jacket": {
      name: "Street Jacket",
      price: "₹1999",
      description: "Stylish jacket designed for urban streetwear lovers.",
      images: ["images/jacket1.jpg", "images/jacket2.jpg", "images/jacket3.jpg"]
    },
    "vel-hoodie": {
      name: "Vel Hoodie",
      price: "₹1799",
      description: "Velvet-finish hoodie for comfort and warmth.",
      images: ["images/hoodie1.jpg", "images/hoodie2.jpg", "images/hoodie3.jpg"]
    }
  };
  
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = products[productId];
  
  // Populate page
  if (product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = product.price;
  
    document.getElementById("main-image").src = product.images[0];
  
    const thumbnailRow = document.getElementById("thumbnail-row");
    product.images.forEach(img => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.classList.add("thumbnail");
      thumb.onclick = () => {
        document.getElementById("main-image").src = img;
      };
      thumbnailRow.appendChild(thumb);
    });
  }