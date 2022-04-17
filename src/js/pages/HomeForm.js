import React, { useState, useRef, useEffect } from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";

import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseContextProvider from "../Context/FirebaseAppContext";

import Simple from "../components/nav";
import DataTable from "../components/table";

function HomeForm() {
    const [data, setData] = useState([]);
    const gotData = useRef(false);

    const navigate = useNavigate();
    const auth = getAuth(FirebaseContextProvider.app);
    const [user, loading] = useAuthState(auth);

    const [searchParams] = useSearchParams();
    const search = searchParams.get("addDriver");

    const config = {
        method: "get",
        url: `https://vehicle-tracking-capstone-2021.ue.r.appspot.com/retrieveUsers`,
        headers: {},
    };

    const columns = [
        {
            Header: "UserName",
            accessor: "username",
        },
        {
            Header: "User Score",
            accessor: "userscore",
            isNumeric: true,
        },
        {
            Header: "Last Driving Session",
            accessor: "lastDrivingSession",
        },
    ];

    useEffect(() => {
        if (!gotData.current) {
            axios(config).then((response) => {
                setData(response.data);
                gotData.current = true;
            });
        }
    }, []);

    const table = (
        <Flex width="full" align="center" justifyContent="center">
            <form>
                <DataTable headers={columns} entries={data}></DataTable>
                <Text align="center" color="green">
                    {search}
                </Text>
            </form>
        </Flex>
    );

    if (loading) return <div>loading...</div>;
    if (!user) navigate("/login");
    return data.length !== 0 ? (
        <div>
            <Simple /> {table}
        </div>
    ) : (
        <Spinner />
    );
}

export default HomeForm;
