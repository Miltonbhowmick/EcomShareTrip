const CART_STORAGE_KEY = "ShareTrip_cartItems";

// Get the cart items from Local Storage
export const getCartItems = () => {
  const cartItems = localStorage.getItem(CART_STORAGE_KEY);
  return cartItems ? JSON.parse(cartItems) : [];
};

// Set modified cart items to Local Storage
export const setCartItems = (cartItems) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    return true;
  } catch (e) {
    return false;
  }
};

// Add single item to the cart
export const addItemToCart = (newItem) => {
  try {
    const currentCartItems = getCartItems();
    const existingItemIndex = currentCartItems.findIndex(
      (cartItem) => cartItem.id === newItem.id
    );

    if (existingItemIndex !== -1) {
      currentCartItems[existingItemIndex].quantity += 1;
    } else {
      currentCartItems.push({ ...newItem, quantity: 1 });
    }

    setCartItems(currentCartItems);
    return true;
  } catch (e) {
    return false;
  }
};

// Remove single item to the cart
export const removeItemFromCart = (removeItem) => {
  try {
    let currentCartItems = getCartItems();
    const existingItemIndex = currentCartItems.findIndex(
      (cartItem) => cartItem.id === removeItem.id
    );
    console.log(existingItemIndex);
    if (existingItemIndex !== -1) {
      currentCartItems[existingItemIndex].quantity -= 1;
      if (currentCartItems[existingItemIndex].quantity === 0) {
        currentCartItems = currentCartItems.filter(
          (item) => item.id !== removeItem.id
        );
      }
    }

    setCartItems(currentCartItems);
    return true;
  } catch (e) {
    return false;
  }
};

// Clear cart
export const clearCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
};
