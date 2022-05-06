import Router from "./components/UI/Router";
import NavBar from "./components/UI/NavBar";
import React, {useContext, useEffect} from 'react'
import AuthService from "./service/AuthService";
import {useDispatch} from "react-redux";
import {Context} from "./index";

function App() {

    const dispatch = useDispatch()
    const {user} = useContext(Context)
    useEffect(() => {
        user.refresh(dispatch)
    },[])

    return (
        <div>
            <header>
                <NavBar/>
                <Router/>
            </header>
            <footer style={{backgroundColor: '#212529', height: '80px'}}>

            </footer>
        </div>
    );
}

export default App;


