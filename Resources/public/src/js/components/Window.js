import React from 'react';
import { Paper } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { observer } from 'mobx-react';

import styleSheet from '../styles/Window'
import RemoteComponent from '../utils/remote-component';

@withStyles(styleSheet)
@observer
export default class extends React.Component {
	
	render() {
        
		const {classes, location} = this.props;
                
		return location.pathname == '/' ? null : (
            <RemoteComponent {...this.props} url={location.pathname}/>
		);

	}
 
}
