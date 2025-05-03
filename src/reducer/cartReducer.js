import { CART_ACTIONS } from "../constants/actionTypes";

const getInitialCart = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialCart = getInitialCart();

export const cartInitialState = {
    cart: initialCart,
    subTotalPrice: initialCart.reduce(
        (acc, product) => acc + (product.totalPrice || product.price * (product.quantity || 1)),
        0
    ),
}


export const cartReducer = (currentState, action) => {

    switch (action.type) {
        case CART_ACTIONS.ADD_TO_CART:
            const existingProduct = currentState.cart.find(product => product?.id === action.newProduct?.id) ?? false;

            if (existingProduct) {
                const updateCart = currentState.cart.map(product => {
                    const updateQuantity = product.quantity < 10 ? product.quantity + 1 : product.quantity;
                    return product?.id === action.newProduct?.id
                        ? {
                            ...product,
                            quantity: updateQuantity,
                            totalPrice: Number((updateQuantity * product.price).toFixed(2)),
                        }
                        : product
                });

                const updateSubTotalPrice = updateCart.reduce((acc, product) => acc + product.totalPrice, 0)

                return { cart: updateCart, subTotalPrice: Number(updateSubTotalPrice.toFixed(2)) };

            } else {
                const updateCart = [{ ...action.newProduct, quantity: 1, totalPrice: Number(action.newProduct.price) }, ...currentState.cart];
                const updateSubTotalPrice = updateCart.reduce((acc, product) => acc + product.totalPrice, 0);

                return { cart: updateCart, subTotalPrice: Number(updateSubTotalPrice.toFixed(2)) };
            }

        case CART_ACTIONS.MANAGE_QUANTITY:
            {
                const updateCart = currentState.cart.map(product => {
                    if (product?.id === action.payload?.productId) {
                        if (action.payload.actionState === 'increment' && product.quantity < 10) {
                            const updateQuantity = product.quantity + 1;
                            return { ...product, quantity: updateQuantity, totalPrice: Number((updateQuantity * product.price).toFixed(2)) }

                        } else if (action.payload.actionState === 'decrement' && product.quantity > 1) {
                            const updateQuantity = product.quantity - 1;
                            return { ...product, quantity: updateQuantity, totalPrice: Number((updateQuantity * product.price).toFixed(2)) }
                        }
                    }
                    return product
                });
                const updateSubTotalPrice = updateCart.reduce((acc, product) => acc + product.totalPrice, 0);

                return { cart: updateCart, subTotalPrice: Number(updateSubTotalPrice.toFixed(2)) };
            }
        case CART_ACTIONS.REMOVE_FROM_CART:
            {
                const updateCart = currentState.cart.filter(product => product?.id !== action.productId);
                const updateSubTotalPrice = updateCart.reduce((acc, product) => acc + product.totalPrice, 0);

                return { cart: updateCart, subTotalPrice: Number(updateSubTotalPrice.toFixed(2)) };
            }
        default:
            return currentState;
    }
}