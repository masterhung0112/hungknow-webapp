import React from 'react';
import { storiesOf } from '@storybook/react';
import LinkingLandingComponent, { LinkingLandingComponentProps } from './linkingLandingComponent';

// export default {
//   title: 'Components/LinkingLandingComponent',
//   component: LinkingLandingComponent,
// } as Meta;

// const Template: Story<LinkingLandingComponentProps> = (args) => <LinkingLandingComponent {...args} />;

storiesOf('Users Info', module)
  // .addDecorator((story) => <IntlProvider>{story()}</IntlProvider>)
  .add(
    'default',
    () => {
      return (
        <LinkingLandingComponent />
      )
    }
  )
