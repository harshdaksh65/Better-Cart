import React, { useContext } from "react";
import { CartContext } from "../../utils/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-card" key={item.id}>
              {(() => {
                return null;
              })()}
              <div
                className="cart-card-image"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="cart-card-content">
                <h2 className="cart-card-title">{item.title}</h2>
                <p className="cart-card-price">${item.price}</p>
                <p className="cart-card-stock">
                  In stock: {item.rating && typeof item.rating.count === "number" ? item.rating.count : "-"}
                </p>
                <div className="cart-card-quantity">
                  <button
                    type="button"
                    className="cart-qty-button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="cart-qty-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="cart-qty-button"
                    disabled={
                      item.rating && typeof item.rating.count === "number"
                        ? item.quantity >= item.rating.count
                        : false
                    }
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="cart-card-remove"
                onClick={() => removeFromCart(item.id)}
              >
                Remove from cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
