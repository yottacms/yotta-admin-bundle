import React from 'react';
import { Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { observer } from 'mobx-react';

@observer
export default class extends React.Component {
    
    render() {
            
        const { classes, store } = this.props;
                
        return (
            <Typography variant="title" color="inherit">
                {store.title}
            </Typography>
        );

    }
 
}
