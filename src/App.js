import React from "react";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";

import LoginForm from "./js/pages/LoginForm";
import HomeForm from "./js/pages/HomeForm";
import AddUser from "./js/pages/AddUser";
import DriversForm from "./js/pages/DriversForm";
import "./scss/App.scss";

function App() {
    const auth = getAuth();
    // eslint-disable-next-line
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <div>loading...</div>;
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomeForm />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/drivers" element={<DriversForm />} />
        </Routes>
    );
}

export default App;
