import '../index.less'
import 'antd/dist/antd.css'

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Cascader } from './Cascader';

export default {
  title: 'Example/Cascader',
  component: Cascader,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Cascader>;

const Template: ComponentStory<typeof Cascader> = (args) => <Cascader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

