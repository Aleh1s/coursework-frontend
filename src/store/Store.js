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
        case 'TO_MY_ORDER':
            return {...state, myOrderId: action.payload}
        default:
            return state
    }
}

export const store = createStore(reducer)
