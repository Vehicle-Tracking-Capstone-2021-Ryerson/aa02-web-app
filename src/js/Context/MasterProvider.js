/* eslint-disable react/prop-types */
import React from "react";
import FirebaseProvider from "./FirebaseAppContext";

export default function MasterProvider({ children }) {
    return <FirebaseProvider>{children}</FirebaseProvider>;
}
