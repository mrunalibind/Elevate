import React from "react";

const ProductItem = ({ product, onAddToCart }) => {
    console.log("Rendering:", product.name);

    return (
        <div
            style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px",
            }}
        >
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.price}</p>

            <button onClick={() => onAddToCart(product)}>
                Add To Cart
            </button>
        </div>
    );
};

export default React.memo(ProductItem);