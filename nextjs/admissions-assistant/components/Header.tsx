import React from "react";

const Header: React.FC = () => (
    <header style={{ padding: "1rem", background: "#1a202c", color: "#fff" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>Admissions Assistant</h1>
        <nav>
            <a href="/application-evaluator" style={{ color: "#fff", marginRight: "1rem" }}>Application Evaluator</a>
            <a href="/application-manager" style={{ color: "#fff", marginRight: "1rem" }}>Application Manager</a>
            <a href="/college-search" style={{ color: "#fff", marginRight: "1rem" }}>College Search</a>
            <a href="/common-data-set-database" style={{ color: "#fff", marginRight: "1rem" }}>Common Data Set Database</a>
            <a href="/essays" style={{ color: "#fff", marginRight: "1rem" }}>Essays</a>
            <a href="/interview" style={{ color: "#fff", marginRight: "1rem" }}>Interview</a>
            <a href="/profile" style={{ color: "#fff", marginRight: "1rem" }}>Profile</a>
            <a href="/scholarship-search" style={{ color: "#fff" }}>Scholarship Search</a>
        </nav>
    </header>
);

export default Header;