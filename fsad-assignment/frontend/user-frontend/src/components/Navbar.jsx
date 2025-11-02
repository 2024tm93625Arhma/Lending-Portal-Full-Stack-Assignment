import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserDetails, logout } from "../utils/auth";


const Navbar = () => {
    const user = getUserDetails();
    const role = user ? user.role : null;

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#282c34",
                padding: "10px 20px",
                color: "white",
            }}
        >
            {/* Left side - App Title and Links */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
                    User Portal
                </Link>

                {/* Equipment links visible only when logged in */}
                {role && (
                    <>
                        <Link
                            to="/equipment"
                            style={{ color: "white", textDecoration: "none", marginRight: "15px" }}
                        >
                            Equipment
                        </Link>

                        {/* Admin-only link */}
                        {role === "ADMIN" && (
                            <Link
                                to="/manage-equipment"
                                style={{ color: "white", textDecoration: "none", marginRight: "15px" }}
                            >
                                Manage Equipment
                            </Link>
                        )}
                    </>
                )}
            </div>

            {/* Right side - Auth buttons */}
            <div>
                {!role && (
                    <>
                        <Link to="/signup" style={{ color: "white", marginRight: "15px" }}>
                            Signup
                        </Link>
                        <Link to="/login" style={{ color: "white" }}>
                            Login
                        </Link>
                    </>
                )}

                {role && (
                    <>
                        <span style={{ marginRight: "15px" }}>Role: {role}</span>
                        <Link
                            to="/profile"
                            style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
                        >
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                                borderRadius: "4px",
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
