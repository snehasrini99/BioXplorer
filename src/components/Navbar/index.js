// components/Navbar/index.js

import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Heading
} from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                    <NavLink to="/search" activeStyle>
                        Personalised Search
                    </NavLink>
                    <NavLink to="/upload" activeStyle>
                        Upload Data
                    </NavLink>
                    <NavLink to="/download" activeStyle>
                        Download Results
                    </NavLink>
                    <NavLink to="/contactUs" activeStyle>
                        Contact Us
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <Heading>BioXplorer</Heading> 
                {/* <NavBtn>
                    <NavBtnLink to="/signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn> */}
            </Nav>
        </>
    );
};

export default Navbar;
