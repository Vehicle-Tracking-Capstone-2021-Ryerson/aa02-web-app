import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import FirebaseContextProvider from "../Context/FirebaseAppContext";

const Links = ["Home", "Drivers"];
const links = ["/", "/drivers"];

const NavLink = ({ children, url }) => (
    <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={url}
    >
        {children}
    </Link>
);

export default function withAction() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const auth = getAuth(FirebaseContextProvider.app);

    const logOut = () => {
        signOut(auth);
    };

    const navigate = useNavigate();

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={"center"}>
                        <Box>AA02</Box>
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            {Links.map((link, index) => (
                                <NavLink key={link} url={links[index]}>
                                    {link}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        <Button
                            variant={"solid"}
                            colorScheme={"teal"}
                            size={"sm"}
                            mr={4}
                            leftIcon={<AddIcon />}
                            onClick={() => navigate("/addUser")}
                        >
                            Add Driver
                        </Button>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={"full"}
                                variant={"link"}
                                cursor={"pointer"}
                                minW={0}
                            >
                                <Avatar size={"sm"} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={toggleColorMode}>
                                    {colorMode === "light" ? "Dark" : "Light"}{" "}
                                    Mode
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={logOut}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

NavLink.propTypes = {
    children: PropTypes.node,
    url: PropTypes.string,
};
