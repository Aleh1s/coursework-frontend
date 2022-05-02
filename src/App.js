import Router from "./components/Router";
import NavBar from "./components/NavBar";

function App() {

    const isAuthenticated = false

  return (
      <div>
        <NavBar isAuthenticated={isAuthenticated}/>
        <Router isAuthenticated={isAuthenticated}/>
      </div>
  );
}

export default App;


