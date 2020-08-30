import styles from '../styles/Home.module.css'
import Root from 'components/root'
import React from 'react'
import { connect } from 'react-redux'
import { NextPageContext } from "next";
import { GlobalState } from 'hkclient-ts/types/store'

export interface PageProps extends GlobalState {
  pageProp: string;
  appProp: string;
}

class Index extends React.Component<PageProps> {
  // note that since _app is wrapped no need to wrap page
  public static async getInitialProps({
    store,
    pathname,
    query,
    req
  }: NextPageContext<GlobalState>) {
    console.log("2. Page.getInitialProps uses the store to dispatch things", {
      pathname,
      query
    });

    if (req) {
      // All async actions must be await'ed
      await store.dispatch({ type: "PAGE", payload: "server" });

      // Some custom thing for this particular page
      return { pageProp: "server" };
    }

    // await is not needed if action is synchronous
    store.dispatch({ type: "PAGE", payload: "client" });

    // Some custom thing for this particular page
    return { pageProp: "client" };
  }

  public render() {
    // console.log('5. Page.render');
    const { pageProp, appProp, entities } = this.props;
    return (
      <div className="index">
        <p>
          Try to navigate to another page and return back here to see how{" "}
          <code>getInitialProps</code> will be used on client side.
        </p>

        <pre>{JSON.stringify({ pageProp, appProp, app, page }, null, 2)}</pre>

        <Link href="/server">
          <a>Navigate</a>
        </Link>
        {" | "}
        <Link href="/static">
          <a>Navigate to static</a>
        </Link>
        {" | "}
        <Link href="/error">
          <a>Navigate to error</a>
        </Link>
      </div>
    );
  }
}

export default connect(state => state)(Index);
