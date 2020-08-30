import React from 'react'

type TalkingProps = {

}

type TalkingStates = {

}

export default class Talking extends React.Component<TalkingProps, TalkingStates> {
    constructor(props: TalkingProps) {
        super(props)
    }

    render() {
        return (
            <h1>Hello</h1>
            // <Route
            //             path={'/landing'}
            //             component={LinkingLandingPage}
            //         />
        )
    }
}