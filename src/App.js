import Router from "./components/Router";
import NavBar from "./components/NavBar";

function App() {

    const style = {
        backgroundColor: '#263238',
        color: 'white',
        minHeight: '100vh'
    }
    const isAuthenticated = false

  return (
      <header style={style}>
        <NavBar isAuthenticated={isAuthenticated}/>
        <Router isAuthenticated={isAuthenticated}/>
      </header>
  );
}

export default App;


