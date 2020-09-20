// import styles from '../styles/Home.module.css'
// import Root from 'components/root'
import React from "react";
import { connect } from "react-redux";
// import { NextPageContext } from "next";
import { GlobalState } from "hkclient-ts/types/store";

export interface PageProps extends GlobalState {
  pageProp: string;
  appProp: string;
}

class Index extends React.Component<PageProps> {
  // note that since _app is wrapped no need to wrap page
  // public static async getInitialProps({
  //   store,
  //   pathname,
  //   query,
  //   req
  // }: NextPageContext<GlobalState>) {
  //   console.log("2. Page.getInitialProps uses the store to dispatch things", {
  //     pathname,
  //     query
  //   });

  //   if (req) {
  //     // All async actions must be await'ed
  //     await store.dispatch({ type: "PAGE", payload: "server" });

  //     // Some custom thing for this particular page
  //     return { pageProp: "server" };
  //   }

  //   // await is not needed if action is synchronous
  //   store.dispatch({ type: "PAGE", payload: "client" });

  //   // Some custom thing for this particular page
  //   return { pageProp: "client" };
  // }

  public render() {
    // console.log('5. Page.render');
    // const { pageProp, appProp, entities } = this.props;
    return <p>Hello</p>;
  }
}

export default connect((state) => state)(Index);
