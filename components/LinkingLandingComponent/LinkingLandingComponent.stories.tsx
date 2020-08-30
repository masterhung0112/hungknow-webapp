import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import LinkingLandingComponent, { LinkingLandingComponentProps } from './LinkingLandingComponent';

export default {
  title: 'Components/LinkingLandingComponent',
  component: LinkingLandingComponent,
} as Meta;

const Template: Story<LinkingLandingComponentProps> = (args) => <LinkingLandingComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
