import {createStore} from "redux";

const initialState = {
    isAuthenticated: false,
    user: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    },
    id: {
        advertisement: '',
        myOrder: '',
        myPurchase: '',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {...state, isAuthenticated: true, user: action.payload}
        case 'LOGOUT':
            return {...state, isAuthenticated: false, user: {}}
        case 'REFRESH':
            return {...state, isAuthenticated: true, user: action.payload}
        case 'SET_ADVERTISEMENT_ID':
            return {...state, id: {...initialState.id, advertisement: action.payload}}
        case 'SET_MY_ORDER_ID':
            return {...state, id: {...initialState.id, myOrder: action.payload}}
        case 'SET_MY_PURCHASE_ID':
            return {...state, id: {...initialState.id, myPurchase: action.payload}}
        default:
            return state
    }
}

export const store = createStore(reducer)
