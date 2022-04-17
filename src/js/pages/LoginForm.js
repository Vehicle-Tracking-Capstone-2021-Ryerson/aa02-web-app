import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Image,
    Text,
    Button,
} from "@chakra-ui/react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseContextProvider from "../Context/FirebaseAppContext";
import logo from "../../login-banner.png";
import "../../scss/LoginForm.scss";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(FirebaseContextProvider.app);
    const [user, loading] = useAuthState(auth);

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password);
    };

    if (loading) return <div>loading...</div>;
    if (user) navigate("/");
    return (
        <div className="login-container">
            <div className="login-banner">
                <Image src={logo} width="100%" height="100%" alt="logo" />
            </div>
            <div className="login-page">
                <Text className="login-title">
                    Vehicle Tracking Application
                </Text>
                <Box w="sm" p="6" margin="auto" textAlign="left">
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="login-user-name">
                                Email
                            </FormLabel>
                            <Input
                                id="login-user-name"
                                placeholder="Enter Email"
                                type="email"
                                onChange={(event) =>
                                    setEmail(event.currentTarget.value)
                                }
                            />
                            <FormLabel my={2} htmlFor="login-password">
                                Password
                            </FormLabel>
                            <Input
                                id="login-password"
                                placeholder="Enter Password"
                                type="password"
                                onChange={(event) =>
                                    setPassword(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <Button my={2} colorScheme="blue" type="submit">
                            Login
                        </Button>
                    </form>
                </Box>
            </div>
        </div>
    );
}

export default LoginForm;
