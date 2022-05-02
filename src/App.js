import Router from "./components/Router";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Router isAuth={true}/>
      </BrowserRouter>
  );
}

export default App;


