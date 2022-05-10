import {createStore} from "redux";

const initialState = {
    isAuthenticated: false,
    user: {},
    advertisementId: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {...state, isAuthenticated: true, user: action.payload}
        case 'LOGOUT':
            return {...state, isAuthenticated: false, user: {}}
        case 'REFRESH':
            return {...state, isAuthenticated: true, user: action.payload}
        case 'TO_PAGE':
            return {...state, advertisementId: action.payload}
        default:
            return state
    }
}

export const store = createStore(reducer)
