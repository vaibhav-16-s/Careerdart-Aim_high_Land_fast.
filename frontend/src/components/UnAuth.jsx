import React from "react";
import { Link } from "react-router-dom";

function UnAuth() {
    return (
        <div
            style={{
                textAlign: "center",
                marginTop: "100px"
            }}
        >
            <h1>401 - UnAuth</h1>

            <p>
                You are not authorized to access this page.
            </p>

            <Link to="/">
                Go to Home
            </Link>
        </div>
    );
}

export default UnAuth;