import AuthService from "../service/AuthService";


export default class User {

    constructor() {
        this.user = {}
    }

    getUser() {
        return this.user
    }

    setUser(user) {
        this.user = user
    }

    async login(authData, dispatch) {
        try {
            const response = await AuthService.authenticate(authData)
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            this.setUser(response.data.userModel)
            dispatch({type: 'AUTHENTICATE', payload: true})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}

