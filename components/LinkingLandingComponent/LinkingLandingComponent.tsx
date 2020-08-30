import { PureComponent } from 'react';

// import desktopImg from 'images/deep-linking/deeplinking-desktop-img.png'
// import mobileImg from 'images/deep-linking/deeplinking-mobile-img.png'

type LinkingLandingComponentProps = {

}

type LinkingLandingComponentState = {

}

export default class LinkingLandingComponent extends PureComponent<LinkingLandingComponentProps, LinkingLandingComponentState> {
    constructor(props: LinkingLandingComponentProps) {
        super(props)
    }

    // renderGraphic = () => {
    //     const isMobile = false //UserAgent.isMobile();

    //     if (isMobile) {
    //         return (
    //             <img src={mobileImg}/>
    //         );
    //     }

    //     return (
    //         <img src={desktopImg}/>
    //     );
    // }

    render() {
        const isMobile = false //UserAgent.isMobile();

        return (
            <div className='get-app'>
                <div className='get-app__dialog'>
                    <div
                        className={`get-app__graphic ${isMobile ? 'mobile' : ''}`}
                    >
                        hello from linking landing
                        {/* {this.renderGraphic()} */}
                    </div>
                    {/* {this.renderDialogBody()} */}
                </div>
            </div>
        )
    }
}