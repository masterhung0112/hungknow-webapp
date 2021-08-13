import React from 'react';
import {storiesOf} from '@storybook/react';

import DividerStyles from './_divider.scss';
import './divider.stories.scss';

storiesOf('Core/Components/Divider', module).
    add('Css', () => {
        return (
            <div className='divider-stories'>
                <div className='section'>
                    Flexbox is pretty baller, can't you see?
                </div>
                <div className={DividerStyles['hk-divider-vertical']}></div>
                <div className='section'>World</div>
                <div className={DividerStyles['hk-divider-vertical']}></div>
                <div className='section'>
                    Markup
                </div>
            </div>
        );
    });