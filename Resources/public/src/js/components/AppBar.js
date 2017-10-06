import React from 'react';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Typography } from 'material-ui';
import { observer } from 'mobx-react';

import styleSheet from '../styles/AppBar'
import Navigation from './Navigation'

@withStyles(styleSheet)
@observer
export default class extends React.Component {
	
    componentDidMount() {
        document.body.className = [document.body.className, this.props.classes.body].join(' ');
    }
    
	render() {
        	
		const {classes, store} = this.props;
        
		return (
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    
                    <Navigation location={this.props.location} menuItems={this.props.bundle}/>

                    <div className={classes.flex}>
                        <Typography type="title" color="inherit">
                            {store.title}
                        </Typography>
                    </div>
                    
                    <div id="widgets_placeholder"/>
                    
                </Toolbar>
            </AppBar>
		);

	}
 
}
