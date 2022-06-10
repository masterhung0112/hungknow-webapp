import React from "react";
import { navigateToUrl } from "single-spa";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { Button } from "@hungknow/uikit";
import '@hungknow/uikit/scss';

interface RouteData {
  routeType: "group" | "app";
  displayName: string;
  to?: string;
  children?: RouteData[];
  tags?: string[];
}
const routeData: RouteData[] = [
  // List of apps for Trading
  {
    routeType: "group",
    displayName: "Trading",
    children: [
      {
        routeType: "app",
        displayName: "Chart",
        to: "chart",
      },
    ],
  },
  // List of apps for utilities
  {
    routeType: "group",
    displayName: "Utilities",
  },
];

export default function Root() {
  return (
    <BrowserRouter basename="/">
      <div className="hk1 navbar navbar-expand-lg">
        <div className="navbar-brand">
          <a href="/" className="hk-navbar-heading">
            Hung Know
          </a>
        </div>
        <div className="hk1 collapse navbar-collapse" id="main-navbar-content">
          <nav className="navbar-nav navbar-nav-scroll">
            <NavLink to="/nft" className="hk-button" onClick={navigateToUrl}>
              NFT
            </NavLink>
            <NavLink
              to="/react-example"
              className="hk-button"
              onClick={navigateToUrl}
            >
              React Example
            </NavLink>
            <span className="hk-navbar-divider"></span>
            <Button className="hk-button hk-minimal hk-icon-user"></Button>
            <Button className="hk-button hk-minimal hk-icon-notification"></Button>
            <Button className="hk-button hk-minimal hk-icon-cog"></Button>
          </nav>
        </div>
      </div>
    </BrowserRouter>
  );
}
