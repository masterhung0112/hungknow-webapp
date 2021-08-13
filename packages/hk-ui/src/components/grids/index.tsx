import React from 'react';
import GridsStyles from './styles/_grids.scss';

export const Row: React.FC = ({children}) => {
    return <div className={GridsStyles['hk-row']}>{children}</div>;
};