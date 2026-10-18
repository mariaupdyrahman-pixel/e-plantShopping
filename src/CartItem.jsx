
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.cost.substring(1)) * item.quantity;
    }, 0);
  };

  const calculateTotalCost = (item) => {
    return (
      parseFloat(item.cost.substring(1)) * item.quantity
    ).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your shopping cart is empty.</p>
          <button onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: {item.cost}</p>

                  <div className="quantity-controls">
                    <button
                      aria-label={`Decrease ${item.name}`}
                      onClick={() => handleDecrement(item)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Increase ${item.name}`}
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>

                  <p>Subtotal: ${calculateTotalCost(item)}</p>

                  <button
                    className="delete-button"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>
              Total: ${calculateTotalAmount().toFixed(2)}
            </h3>

            <button onClick={handleContinueShopping}>
              Continue Shopping
            </button>

            <button onClick={handleCheckoutShopping}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
