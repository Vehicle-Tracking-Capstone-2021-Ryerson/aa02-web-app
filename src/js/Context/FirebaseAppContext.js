/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

import { initializeApp } from "firebase/app";

export const FirebaseContext = createContext();

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ4TnVyxaEX6AlPkkNXyUf7tHueketMsE",
    authDomain: "vehicle-tracking-capstone-2021.firebaseapp.com",
    projectId: "vehicle-tracking-capstone-2021",
    storageBucket: "vehicle-tracking-capstone-2021.appspot.com",
    messagingSenderId: "955844636065",
    appId: "1:955844636065:web:a8ec2a8910cb88ec52afe0",
};

const FirebaseContextProvider = (props) => {
    // eslint-disable-next-line
    const [app, setApp] = useState(initializeApp(firebaseConfig));
    return (
        <FirebaseContext.Provider value={{ app }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContextProvider;
