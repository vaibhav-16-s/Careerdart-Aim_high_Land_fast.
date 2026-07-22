import React from "react";
import { Link } from "react-router-dom";

function UnAuth() {
    return (
        <div className="unauth-page">
            <div className="unauth-card">
                <p className="unauth-card__code">401</p>
                <h2 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Access Denied</h2>
                <p style={{ color: 'var(--cd-text-secondary)', marginBottom: '1.5rem' }}>
                    You are not authorized to view this page. Please sign in with the correct account.
                </p>
                <Link to="/home/login" className="btn-cd-primary" style={{ display: 'inline-flex' }}>
                    Go to Login
                </Link>
            </div>
        </div>
    );
}

export default UnAuth;
