import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Button,
    Flex,
    Text,
} from "@chakra-ui/react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const config = {
            method: "get",
            url: `https://vehicle-tracking-capstone-2021.ue.r.appspot.com/addUser?username=${username}&password=${password}`,
            headers: {},
        };

        axios(config)
            .then((response) => {
                navigate(`/?addDriver=${response.data}`);
            })
            .catch((errorRes) => {
                setError(errorRes.response.data);
            });
    };

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box w="sm" p="6">
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="login-user-name">
                            Username
                        </FormLabel>
                        <Input
                            id="driving-username"
                            placeholder="Enter a Unique Username"
                            type="text"
                            onChange={(event) =>
                                setUsername(event.currentTarget.value)
                            }
                        />
                        <FormLabel my={2} htmlFor="login-password">
                            Password
                        </FormLabel>
                        <Input
                            id="driving-password"
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
                    <Button
                        my={2}
                        mx={4}
                        colorScheme="red"
                        onClick={() => navigate("/")}
                    >
                        Go Back
                    </Button>
                    <Text color="tomato">{error}</Text>
                </form>
            </Box>
        </Flex>
    );
}

export default AddUser;
