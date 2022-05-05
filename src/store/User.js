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

    async login(authData, dispatch, navigate) {
        try {
            const response = await AuthService.authenticate(authData)
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            this.setUser(response.data.userModel)
            dispatch({type: 'AUTHENTICATE', payload: true})
            navigate('/')
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async register(regData, navigate) {
        try {
            await AuthService.register(regData)
            navigate('/sign-in')
        } catch (e) {
            console.log(e.response?.data?.message)
        }

    }

    logout(dispatch, navigate) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch({type: 'LOGOUT', payload: false})
        navigate('/sign-in')
    }
}

