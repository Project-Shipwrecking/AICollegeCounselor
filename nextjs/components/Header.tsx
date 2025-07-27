"use client";

import React from "react";

function Header() {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data === true) setIsAdmin(true);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: "1rem", backgroundColor: "lightblue" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-3 rounded">
        <h3 style={{margin: "1rem"}} className="text-primary"> <a href="/">Admissions Assistant</a></h3>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/app/college-search">
                  College Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/app/essays">
                  Essays
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/app/application-evaluator">
                  Application Evaluator
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/app/application-manager">
                  Application Manager
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/app/common-data-set-database">
                  Common Data Set Database
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/app/profile">
                  Profile
                </a>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <a className="nav-link text-danger" href="/admin">
                    Admin
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
