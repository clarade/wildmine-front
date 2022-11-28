import React from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { userInfo } from "./graphql/UserSession.js";

import Settings from "./pages/Settings.js";
import Dashboard from "./pages/Dashboard.js";
import Organization from "./pages/Organization.js";
import Issues from "./pages/Issues.js";
import DetailsIssue from "./pages/DetailsIssue";
import Projects from "./pages/Projects.js";
import DetailsProject from "./pages/DetailsProject.js";
import TopBar from "./components/TopBar.js";
import Login from "./pages/Login.js";
import "./css/tailwind.css";
import Subsription from "./pages/Subscription.js";
import Layout from "./components/Layout.js";
import MobileBar from "./components/MobileBar.js";

const App = () => {
  const { data, refetch, loading } = useQuery(userInfo);

  console.log(data);

  const isMobile = window.innerWidth <= 1024;

  if (!data && loading) return <div>Loading ...</div>;

  return (
    <div className="w-full">
      {!data ? (
        <>
          <Routes>
            <Route
              exact
              path="/"
              element={<Login onLoginSuccess={refetch} />}
            />

            <Route exact path="/subscription" element={<Subsription />} />
          </Routes>
        </>
      ) : (
        <>
          {isMobile ? <MobileBar /> : <TopBar />}
          <Layout>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Dashboard actualUser={data.userInfo} isMobile={isMobile} />
                }
              />

              <Route
                path="/organization"
                element={<Organization isMobile={isMobile} />}
              />

              <Route
                path="/projects"
                element={<Projects isMobile={isMobile} />}
              />

              <Route
                path="/detailsProject/:id"
                element={<DetailsProject actualUser={data.userInfo} />}
              />

              <Route
                path="/issuesProject"
                element={<Issues isMobile={isMobile} />}
              />

              <Route path="/issue/:id" element={<DetailsIssue />} />
              <Route
                path="/settings"
                element={<Settings isMobile={isMobile} />}
              />
            </Routes>
          </Layout>
        </>
      )}
    </div>
  );
};

export default App;
