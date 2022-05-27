import Router from "./components/UI/Router";
import NavBar from "./components/UI/NavBar";
import React, {useEffect} from 'react'
import AuthService from "./service/AuthService";
import {useDispatch} from "react-redux";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        checkAuth()
    },[])

    const checkAuth = () => {
        AuthService.refresh()
            .then(response => {
                localStorage.setItem('accessToken', `Bearer_${response.data.token}`)
                dispatch({type: 'REFRESH', payload:
                        {
                            email: response.data.userResponse.email,
                            firstName: response.data.userResponse.firstName,
                            lastName: response.data.userResponse.lastName,
                            phoneNumber: response.data.userResponse.phoneNumber
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


