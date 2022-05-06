import {createStore} from "redux";

const initialState = {
    isAuthenticated: false,
    email: ''

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {...state, isAuthenticated: action.payload}
        case 'LOGOUT':
            return {...state, isAuthenticated: action.payload}
        default:
            return state
    }
}

export const store = createStore(reducer)
