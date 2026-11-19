
import { useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../../data/products";

export default function AdminProducts() {
  const [products, setProducts] = useState(() => getProducts());

  const [form, setForm] = useState({
    name: "",
    price: "",
    rating: "4.5",
    image: "",
    category: "Electronics",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.price || !form.image) {
      alert("Please fill in all required fields.");
      return;
    }

    if (Number(form.price) <= 0) {
      alert("Price must be greater than zero.");
      return;
    }

    const newProduct = addProduct(form);

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

    setForm({
      name: "",
      price: "",
      rating: "4.5",
      image: "",
      category: "Electronics",
    });

    alert("Product added successfully!");
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const updatedProducts = deleteProduct(id);
    setProducts(updatedProducts);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Product Management
        </h1>
        <p className="text-slate-500">
          Add, view and delete store products.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-lg bg-white p-6 shadow-sm md:grid-cols-2"
      >
        <h2 className="text-lg font-semibold md:col-span-2">
          Add New Product
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          className="rounded-md border p-3"
          required
        />

        <input
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="rounded-md border p-3"
          required
        />

        <input
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="rounded-md border p-3"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="rounded-md border p-3"
        >
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Accessories</option>
          <option>Home</option>
          <option>Sports</option>
        </select>

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Product image URL"
          className="rounded-md border p-3 md:col-span-2"
          required
        />

        <button
          type="submit"
          className="rounded-md bg-[#12332F] p-3 font-semibold text-white hover:bg-[#0d2724] md:col-span-2"
        >
          Add Product
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          All Products ({products.length})
        </h2>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3 font-medium">
                  {product.name}
                </td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="p-3">{product.rating} / 5</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
