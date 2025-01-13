import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000"; // Your backend URL
    
    // States
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : {};
    });
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // Save cart to local storage
    const saveCartToLocalStorage = (newCartItems) => {
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    };

    // Sync cart with backend
    const syncCartWithBackend = async () => {
        if (token) {
            try {
                const response = await axios.post(
                    `${url}/api/cart/sync`,
                    { cartItems },
                    { headers: { token } }
                );
                setCartItems(response.data.cart || {});
                saveCartToLocalStorage(response.data.cart || {});
            } catch (error) {
                console.error("Error syncing cart with backend:", error);
            }
        }
    };

    // Fetch cart from backend after login
    const fetchCartFromBackend = async () => {
        if (token) {
            try {
                const response = await axios.get(`${url}/api/cart`, {
                    headers: { token },
                });
                setCartItems(response.data.cart || {});
                saveCartToLocalStorage(response.data.cart || {});
            } catch (error) {
                console.error("Error fetching cart from backend:", error);
            }
        }
    };

    // Add an item to the cart
    const addToCart = async (itemId) => {
        const updatedCartItems = {
            ...cartItems,
            [itemId]: (cartItems[itemId] || 0) + 1,
        };
        setCartItems(updatedCartItems);
        saveCartToLocalStorage(updatedCartItems);

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    // Remove an item from the cart
    const removeFromCart = async (itemId) => {
        const updatedCartItems = { ...cartItems };
        if (updatedCartItems[itemId] > 1) {
            updatedCartItems[itemId] -= 1;
        } else {
            delete updatedCartItems[itemId];
        }
        setCartItems(updatedCartItems);
        saveCartToLocalStorage(updatedCartItems);

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    // Clear the cart
    const clearCart = async () => {
        setCartItems({});
        saveCartToLocalStorage({});
        if (token) {
            await axios.post(`${url}/api/cart/clear`, {}, { headers: { token } });
        }
    };

    // Calculate the total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const itemInfo = food_list.find((product) => product._id === item);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Fetch the food list from the server
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data || []);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Initial fetch of the food list
    useEffect(() => {
        fetchFoodList();
    }, []);

    // Sync cart items with local storage whenever they change
    useEffect(() => {
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    // Fetch cart from backend whenever the token changes (login/logout)
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            fetchCartFromBackend(); // Fetch cart when logged in
        } else {
            localStorage.removeItem("token");
            clearCart(); // Clear cart on logout
        }
    }, [token]);

    // Sync cart with backend when cart items change
    useEffect(() => {
        syncCartWithBackend();
    }, [cartItems]);

    // Context value
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

