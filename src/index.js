import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import "./scss/index.scss";

import MasterProvider from "./js/Context/MasterProvider";
import App from "./App";

import reportWebVitals from "./reportWebVitals";

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <MasterProvider>
                <BrowserRouter>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <App />
                </BrowserRouter>
            </MasterProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
