import React, { useState, useEffect, useReducer } from 'react'
const Context = React.createContext({
    isCartOpened: false,
    mealsData: [],
    cartItemsState: [],
    openCartHandler: () => { },
    orderCartHandler: () => { },
    addCartItemHandler: (itemData) => { },
    removeCartItemHandler: (name) => { },
    incrementCartItem: (name) => { },
})


//Reducer Functions
const dispatchHandler = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        return addState(state, action.value)
    } else if (action.type === 'REMOVE_ITEM') {
        return removeState(state, action.value)
    } else {
        return defaultState(state)
    }
}
//Dispatch Actions

const addState = (state, value) => {
    const item = {
        id: value.id,
        name: value.name,
        price: value.price,
        amount: value.amount
    }
    if (checkIfItemExist(item.name, state)) {
        let updatedState = state.map(cartItem => {
            if (cartItem.name === item.name) {
                cartItem.amount = cartItem.amount + item.amount
            }
            return cartItem
        })
        return updatedState
    } else {
        return [...state, item];
    }
}
const removeState = (state, value) => {
    let updatedState;
    if (checkIfItemExist(value, state)) {
        updatedState = state.map(cartItem => {
            if (cartItem.name === value) {
                cartItem.amount = cartItem.amount - 1
            }
            return cartItem
        })

    }
    updatedState = updatedState.filter(item => item.amount > 0)
    return updatedState
}
const defaultState = (state) => {
    return [...state];
}
const checkIfItemExist = (itemName, itemsList) => {
    let exist = false
    itemsList.forEach(item => {
        if (item.name === itemName) {
            exist = true;
        }
    });
    return exist;
}



export const ContextProvider = (props) => {

    //------STATES------//

    // local states -> single component
    const [isCartOpened, setIsCartOpened] = useState(false);
    //global states -> Whole app
    const [cartItemsState, dispatchCartItems] = useReducer(dispatchHandler, [])

    const mealsData = [
        {
            id: 'm1',
            name: 'Sushi',
            description: 'Finest fish and veggies',
            price: 22.99,
        },
        {
            id: 'm2',
            name: 'Schnitzel',
            description: 'A german specialty!',
            price: 16.5,
        },
        {
            id: 'm3',
            name: 'Barbecue Burger',
            description: 'American, raw, meaty',
            price: 12.99,
        },
        {
            id: 'm4',
            name: 'Green Bowl',
            description: 'Healthy...and green...',
            price: 18.99,
        },
    ];

    //********************************************************************************/
    //********************************************************************************/

    //------FUNCTIONS------//

    //cart functions
    const openCartHandler = () => {
        setIsCartOpened(prevState => !prevState)
    }

    const orderCartHandler = () => {
        alert('order recived :)')
    }

    const addCartItemHandler = (itemData) => {
        dispatchCartItems({ type: 'ADD_ITEM', value: itemData })
    }

    const incrementCartItem = (name) => {
        dispatchCartItems({ type: 'ADD_ITEM', value: { name: name, amount: 1 } })

    }

    const removeCartItemHandler = (name) => {
        dispatchCartItems({ type: 'REMOVE_ITEM', value: name })
    }

    //********************************************************************************/
    //********************************************************************************/

    const contextProviderValues = {
        isCartOpened: isCartOpened,
        mealsData: mealsData,
        cartItemsState: cartItemsState,
        openCartHandler: openCartHandler,
        orderCartHandler: orderCartHandler,
        incrementCartItem: incrementCartItem,
        addCartItemHandler: addCartItemHandler,
        removeCartItemHandler: removeCartItemHandler,

    }

    return (
        <>
            <Context.Provider value={contextProviderValues} >
                {props.children}
            </Context.Provider>
        </>
    )
}

export default Context 
