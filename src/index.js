import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import User from "./store/User";
import {Provider} from "react-redux";
import {store} from "./store/Store";

const root = ReactDOM.createRoot(document.getElementById('root'));

let advertisementId = "";

export const Context = React.createContext({
    advertisementId
})


root.render(
    <React.StrictMode>
        <Context.Provider value={{
            advertisementId
        }}>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>
);

reportWebVitals();
