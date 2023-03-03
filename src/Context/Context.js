import React, { useState, useReducer, useEffect } from 'react'
import useHttp from '../hooks/useHttp'
const Context = React.createContext({
    isCartOpened: false,
    isOrderProcessing: false,
    mealsData: [],
    cartItemsState: [],
    openCartHandler: () => { },
    orderCartHandler: () => { },
    addCartItemHandler: (itemData) => { },
    removeCartItemHandler: (name) => { },
    incrementCartItem: (name) => { },
    resetCartHandler: () => { },
    handleIsOrderProcessing: () => { },
    isLoading: false,
    error: null,
    hasOrdered: false
})


//Reducer Functions
const dispatchHandler = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        return addState(state, action.value)
    } else if (action.type === 'REMOVE_ITEM') {
        return removeState(state, action.value)
    } else if (action.type === 'RESET_CART') {
        return resetCartItems()
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

const resetCartItems = () => {
    return []
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
    const [isOrderProcessing, setIsOrderProcessing] = useState(false);
    //global states -> Whole app
    const [cartItemsState, dispatchCartItems] = useReducer(dispatchHandler, [])
    const [mealsData, setMealsData] = useState([]);
    const [hasOrdered, setHasOrdered] = useState(false);
    const { error, isLoading, sendRequest: fetchMealsData } = useHttp()

    const configrations = {
        url: 'https://react-demo-ff703-default-rtdb.firebaseio.com/meals.json',
    }

    //********************************************************************************/
    //********************************************************************************/

    //------FUNCTIONS------//
    //fetch meals
    const preprocessor = (meals) => {
        let mealsList = []
        for (const key in meals) {
            mealsList.push({
                id: key,
                name: meals[key].name,
                description: meals[key].description,
                price: meals[key].price,
            })
            setMealsData(mealsList)
        }
    }
    useEffect(() => {
        fetchMealsData(configrations, preprocessor)
    }, [fetchMealsData])

    //cart functions
    const openCartHandler = () => {
        setIsCartOpened(prevState => !prevState)
        setHasOrdered(false)
    }

    const orderCartHandler = () => {
        setHasOrdered(prevState => !prevState)
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
    const resetCartHandler = () => {
        dispatchCartItems({ type: 'RESET_CART' })
    }
    const handleIsOrderProcessing = () => {
        setIsOrderProcessing(prevState => !prevState)
    }
    //********************************************************************************/
    //********************************************************************************/

    const contextProviderValues = {
        isCartOpened: isCartOpened,
        mealsData: mealsData,
        isLoading: isLoading,
        error: error,
        hasOrdered: hasOrdered,
        cartItemsState: cartItemsState,
        isOrderProcessing: isOrderProcessing,
        handleIsOrderProcessing: handleIsOrderProcessing,
        openCartHandler: openCartHandler,
        orderCartHandler: orderCartHandler,
        incrementCartItem: incrementCartItem,
        addCartItemHandler: addCartItemHandler,
        removeCartItemHandler: removeCartItemHandler,
        resetCartHandler: resetCartHandler

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
