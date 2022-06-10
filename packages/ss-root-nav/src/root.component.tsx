import React from "react";
import { navigateToUrl } from "single-spa";

export default function Root() {
  return (
    <div className="hk1 navbar navbar-expand-lg">
      <div className="navbar-brand">
        <a href="/" className="hk-navbar-heading">
          HungKnow
        </a>
      </div>
      <div className="hk1 collapse navbar-collapse" id="main-navbar-content">
        <nav className="navbar-nav navbar-nav-scroll">
          <a href="/" className="hk-button" onClick={navigateToUrl}>
            Home
          </a>
          <a href="/nft" className="hk-button" onClick={navigateToUrl}>
            NFT
          </a>
          <a
            href="/react-example"
            className="hk-button"
            onClick={navigateToUrl}
          >
            React Example
          </a>
          <span className="hk-navbar-divider"></span>
          <button className="hk-button hk-minimal hk-icon-user"></button>
          <button className="hk-button hk-minimal hk-icon-notification"></button>
          <button className="hk-button hk-minimal hk-icon-cog"></button>
        </nav>
      </div>
    </div>
  );
}
