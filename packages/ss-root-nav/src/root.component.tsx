import { navigateToUrl } from 'single-spa'

export default function Root() {
  return <nav className="hk-navbar">
    <div className="hk-navbar-group hk-align-left">
      <div className="hk-navbar-heading">HungKnow</div>
    </div>
    <div className="hk-navbar-group hk-align-right">
      <a href="/" className="hk-button" onClick={navigateToUrl}>Home</a>
      <a href="/nft" className="hk-button" onClick={navigateToUrl}>NFT</a>
      <a href="/react-example" className="hk-button" onClick={navigateToUrl}>React Example</a>
      <span className="hk-navbar-divider"></span>
      <button className="hk-button hk-minimal hk-icon-user"></button>
      <button className="hk-button hk-minimal hk-icon-notification"></button>
      <button className="hk-button hk-minimal hk-icon-cog"></button>
    </div>
  </nav>
}
