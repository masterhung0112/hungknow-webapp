import React from 'react';
// import { Story, Meta } from '@storybook/react/types-6-0';
import { storiesOf } from '@storybook/react';
import LinkingLandingComponent, { LinkingLandingComponentProps } from './linkingLandingComponent';
import IntlProvider from 'components/intl-provider';
import 'styles/styles.scss'

// export default {
//   title: 'Components/LinkingLandingComponent',
//   component: LinkingLandingComponent,
// } as Meta;

// const Template: Story<LinkingLandingComponentProps> = (args) => <LinkingLandingComponent {...args} />;

storiesOf('Users Info', module)
  .addDecorator((story) => <IntlProvider>{story()}</IntlProvider>)
  .add(
    'default',
    () => {
      return (
        <LinkingLandingComponent />
      )
    }
  )
