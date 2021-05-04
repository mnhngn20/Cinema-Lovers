import React from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import MainContent from '../../containers/MainContent/MainContent';
import WebInfo from '../../components/WebInfo/WebInfo';
import classes from './Layout.module.css';

const Layout = props => {
    return (
        <div>
            <div>
                <Toolbar />
            </div>
            <main className={classes.MarginTop}>
                {props.children}
            </main>
            <div>
                <WebInfo />
            </div>
        </div>
    );
}

export default Layout;