import Router from "./components/Router";
import NavBar from "./components/NavBar";
import {Col, Container, Row} from "react-bootstrap";

function App() {

    const style = {
        backgroundColor: '#263238',
        color: 'white',
        minHeight: '100vh'
    }
    const isAuthenticated = true

    return (
        <div>
            <header style={style}>
                <NavBar isAuthenticated={isAuthenticated}/>
                <Router isAuthenticated={isAuthenticated}/>
            </header>
            <footer style={{backgroundColor: '#212529', height: '80px'}}>

            </footer>
        </div>
    );
}

export default App;


