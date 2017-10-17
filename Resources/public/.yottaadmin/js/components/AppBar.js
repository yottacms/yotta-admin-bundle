import React from 'react';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, IconButton, Icon, Typography } from 'material-ui';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'

import AppBarTitle from './AppBarTitle'
import Navigation from './Navigation'
import styleSheet from '../styles/AppBar'

@withStyles(styleSheet)
export default class extends React.Component {
    
    componentDidMount() {
        document.body.className = [document.body.className, this.props.classes.body].join(' ');
        this.componentWillUpdate();
    }
    
    componentWillUpdate() {
        this.props.store.setTitle(this.props.title);
    }
    
    render() {
            
        const {classes, store, location} = this.props,
            isHomePage = location.pathname == '/';
                
        return (
            <AppBar className={classes.appBar}>
            
                <Toolbar className={classes.toolBar}>
                    
                    <Navigation location={this.props.location} menuItems={this.props.bundle}/>

                    <div className={classes.flex}>
                        <AppBarTitle {...this.props} />
                    </div>
                    
                    {isHomePage && (
                        <Typography color="inherit">widgets will be here...</Typography>
                    )}
                    
                    {!isHomePage && (
                        <Link to="/" className={classes.menuIcon}>
                            <IconButton color="contrast">
                                <Icon>close</Icon>
                            </IconButton>
                        </Link>
                    )}
                    
                </Toolbar>
            </AppBar>
            
        );

    }
 
}
