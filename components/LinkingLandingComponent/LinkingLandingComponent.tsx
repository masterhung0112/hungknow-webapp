import { PureComponent } from 'react';

type LinkingLandingComponentProps = {

}

type LinkingLandingComponentState = {

}

export default class LinkingLandingComponent extends PureComponent<LinkingLandingComponentProps, LinkingLandingComponentState> {
    constructor(props: LinkingLandingComponentProps) {
        super(props)
    }

    renderGraphic = () => {
        const isMobile = true //UserAgent.isMobile();

        if (isMobile) {
            return (
                <img src='/images/deep-linking/deeplinking-mobile-img.png'/>
            );
        }

        return (
            <img src='/images/deep-linking/deeplinking-desktop-img.png'/>
        );
    }

    render() {
        const isMobile = false //UserAgent.isMobile();

        return (
            <div className='get-app'>
                <div className='get-app__dialog'>
                    <div
                        className={`get-app__graphic ${isMobile ? 'mobile' : ''}`}
                    >
                        {this.renderGraphic()}
                    </div>
                    {/* {this.renderDialogBody()} */}
                </div>
            </div>
        )
    }
}