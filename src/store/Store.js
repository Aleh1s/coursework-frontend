import {createStore} from "redux";

const initialState = {
    isAuthenticated: false,
    user: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    },
    advertisementId: '',
    myOrderId: '',
    myAdvertisementOrderId: '',
    advertisementToRemove: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {...state, isAuthenticated: true, user: action.payload}
        case 'LOGOUT':
            return {...state, isAuthenticated: false, user: {}}
        case 'REFRESH':
            return {...state, isAuthenticated: true, user: action.payload}
        case 'TO_ADVERTISEMENT':
            return {...state, advertisementId: action.payload}
        case 'MY_ORDER_ID':
            return {...state, myOrderId: action.payload}
        case 'MY_ADVERTISEMENT_ORDER_ID':
            return {...state, myAdvertisementOrderId: action.payload}
        case 'ADVERTISEMENT_ID_TO_REMOVE':
            return {...state, advertisementToRemove: action.payload}
        default:
            return state
    }
}

export const store = createStore(reducer)
