"use client"

import React from "react";
// import { auth, signIn, signOut } from "@/auth";

function Header() {
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        fetch("/api/admin")
            .then(res => res.json())
            .then(data => {
                if (data === true) setIsAdmin(true);
            })
            .catch(() => {});
    }, []);

    return (
        <header style={{ padding: "1rem", background: "#1a202c", color: "#fff" }}>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>Admissions Assistant</h1>
            <nav>
                <a href="/app/application-evaluator" style={{ color: "#fff", marginRight: "1rem" }}>Application Evaluator</a>
                <a href="/app/application-manager" style={{ color: "#fff", marginRight: "1rem" }}>Application Manager</a>
                <a href="/app/college-search" style={{ color: "#fff", marginRight: "1rem" }}>College Search</a>
                <a href="/app/common-data-set-database" style={{ color: "#fff", marginRight: "1rem" }}>Common Data Set Database</a>
                <a href="/app/essays" style={{ color: "#fff", marginRight: "1rem" }}>Essays</a>
                <a href="/app/interview" style={{ color: "#fff", marginRight: "1rem" }}>Interview</a>
                <a href="/app/profile" style={{ color: "#fff", marginRight: "1rem" }}>Profile</a>
                <a href="/app/scholarship-search" style={{ color: "#fff", marginRight: "1rem" }}>Scholarship Search</a>
                { isAdmin ? <a href="/admin" style={{ color: "red" }}>Admin</a> : <></>}
            </nav>
        </header>
    );
}

export default Header;