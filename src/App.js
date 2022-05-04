import Router from "./components/UI/Router";
import NavBar from "./components/UI/NavBar";
import {Col, Container, Row} from "react-bootstrap";

function App() {


    const isAuthenticated = true

    return (
        <div>
            <header>
                <NavBar isAuthenticated={isAuthenticated}/>
                <Router isAuthenticated={isAuthenticated}/>
            </header>
            <footer style={{backgroundColor: '#212529', height: '80px'}}>

            </footer>
        </div>
    );
}

export default App;


