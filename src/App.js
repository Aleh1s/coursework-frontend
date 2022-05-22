import Router from "./components/UI/Router";
import NavBar from "./components/UI/NavBar";
import React, {useEffect} from 'react'
import AuthService from "./service/AuthService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function App() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
    },[])

    const checkAuth = () => {
        AuthService.refresh()
            .then(response => {
                localStorage.setItem('accessToken', `Bearer_${response.data.accessToken}`)
                localStorage.setItem('refreshToken', `Bearer_${response.data.refreshToken}`)
                dispatch({type: 'REFRESH', payload:
                        {
                            email: response.data.userResponseModel.email,
                            firstName: response.data.userResponseModel.firstName,
                            lastName: response.data.userResponseModel.lastName,
                            phoneNumber: response.data.userResponseModel.phoneNumber
                        }
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <div style={{minHeight: '100%'}}>
            <header>
                <NavBar/>
                <Router/>
            </header>
            <main>

            </main>
            <footer style={{backgroundColor: '#212529', height: '80px'}}>

            </footer>
        </div>
    );
}

export default App;


