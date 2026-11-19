const initialProducts = [
  { id: 1, name: "Wireless Headphones", price: 49.99, rating: 4.8, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", category: "Electronics" },
  { id: 2, name: "Smart Watch", price: 79.99, rating: 4.6, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", category: "Electronics" },
  { id: 3, name: "Running Shoes", price: 59.99, rating: 4.7, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "Fashion" },
  { id: 4, name: "Classic Backpack", price: 35.00, rating: 4.4, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", category: "Accessories" },
  { id: 5, name: "Digital Camera", price: 299.99, rating: 4.9, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", category: "Electronics" },
  { id: 6, name: "Sunglasses", price: 24.99, rating: 4.3, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083", category: "Fashion" },
  { id: 7, name: "Laptop", price: 799.99, rating: 4.9, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853", category: "Electronics" },
  { id: 8, name: "Coffee Maker", price: 89.99, rating: 4.5, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085", category: "Home" },
  { id: 9, name: "Leather Handbag", price: 65.00, rating: 4.6, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", category: "Fashion" },
  { id: 10, name: "Bluetooth Speaker", price: 39.99, rating: 4.5, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1", category: "Electronics" },
  { id: 11, name: "Desk Lamp", price: 29.99, rating: 4.2, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c", category: "Home" },
  { id: 12, name: "Sports Water Bottle", price: 15.99, rating: 4.4, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8", category: "Accessories" },
];

export function getProducts() {
  const savedProducts = localStorage.getItem("products");

  if (savedProducts) {
    return JSON.parse(savedProducts);
  }

  localStorage.setItem("products", JSON.stringify(initialProducts));
  return initialProducts;
}

export function addProduct(product) {
  const products = getProducts();

  const newProduct = {
    ...product,
    id: Date.now(),
    price: Number(product.price),
    rating: Number(product.rating),
  };

  const updatedProducts = [...products, newProduct];

  localStorage.setItem("products", JSON.stringify(updatedProducts));

  return newProduct;
}
export function deleteProduct(productId) {
  const products = getProducts();

  const updatedProducts = products.filter(
    (product) => product.id !== productId
  );

  localStorage.setItem("products", JSON.stringify(updatedProducts));

  return updatedProducts;
}

export default getProducts();