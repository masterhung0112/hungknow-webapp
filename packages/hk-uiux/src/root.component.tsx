import { Icon } from '@hungknow/uikit';
import './scss/root.scss';

export default function Root(props) {
  return (
    <>
      <nav>
      <div className="main_nav">
        <Icon icon={'bar'} />
        <div id="main_nav_workspace">
          <ul>
            <li>Trading</li>
          </ul>
        </div>

        <div id="main_nav_notification">

        </div>

      </div>
      </nav>
      <main></main>
    </>
  );
}
