import {createStore} from "redux";

const initialState = {
    isAuthenticated: false,
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {...state, isAuthenticated: true, user: action.payload}
        case 'LOGOUT':
            return {...state, isAuthenticated: false, user: {}}
        case 'REFRESH':
            return {...state, isAuthenticated: true, user: action.payload}
        default:
            return state
    }
}

export const store = createStore(reducer)
