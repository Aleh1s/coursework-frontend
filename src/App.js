import Router from "./components/UI/Router";
import NavBar from "./components/UI/NavBar";
import React from 'react'

function App() {
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


