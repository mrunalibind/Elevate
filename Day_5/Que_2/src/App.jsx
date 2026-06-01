import React, {
  useState,
  useMemo,
  useCallback,
} from "react";

import ProductItem from "./ProductItem";

function App() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 50000,
    },
    {
      id: 2,
      name: "Phone",
      category: "Electronics",
      price: 25000,
    },
    {
      id: 3,
      name: "Shoes",
      category: "Fashion",
      price: 3000,
    },
    {
      id: 4,
      name: "Watch",
      category: "Accessories",
      price: 5000,
    },
    {
      id: 5,
      name: "Headphones",
      category: "Electronics",
      price: 4000,
    },
  ];

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [counter, setCounter] = useState(0);

  const filteredProducts = useMemo(() => {
    console.log("Filtering Products");

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const cartTotal = useMemo(() => {
    console.log("Calculating Cart Total");

    return cart.reduce(
      (sum, item) => sum + item.price,
      0
    );
  }, [cart]);

  const handleAddToCart = useCallback(
    (product) => {
      setCart((prev) => [...prev, product]);
    },
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Search & Cart App</h1>

      <h3>Cart Count: {cart.length}</h3>
      <h3>Cart Total: ₹{cartTotal}</h3>

      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={() =>
          setCounter((prev) => prev + 1)
        }
      >
        Counter: {counter}
      </button>

      <hr />

      {filteredProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default App;