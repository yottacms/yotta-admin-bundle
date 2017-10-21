import React from 'react';
import { LinearProgress } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import styleSheet from '../styles/Window'

@withStyles(styleSheet)
export default class extends React.Component {
    
    timer: number;
    
    state = {
        completed: 0,
        visible: true
    }
    
    componentWillMount() {
        this.componentWillReceiveProps();
    }
    
    componentWillReceiveProps() {
        this.timer = setInterval(this.progress, 100);
        this.setState({ completed: 0, visible: true });
    }
    
    componentWillUnmount() {
        this.loadComplete();
    }
    
    loadComplete() {
        clearInterval(this.timer);
    }
    
    progress = () => {
        
        const { completed } = this.state;
        
        if (completed > 100) {
            this.loadComplete();
        } else {
            const diff = Math.random() * 20;
            this.setState({ completed: completed + diff });
        }

    };
    
    render() {
                
        const { classes } = this.props;
        
        return this.state.visible
            ? <LinearProgress className={classes.progressBar} color="accent" mode="determinate" value={this.state.completed}/>
            : null
        ;

    }
 
}
