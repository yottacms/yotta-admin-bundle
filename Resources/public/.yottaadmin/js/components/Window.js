import React from 'react';
import { Snackbar, Button } from 'material-ui';
import Fade from 'material-ui/transitions/Fade';

import FakeProgressBar from './FakeProgressBar'
import RemoteComponent from '../utils/remote-component';

export default class extends React.Component {
    
    progressBar: object;
    
    state = {
        errorLoading: false
    }
    
    loadComplete = () => {
        if (this.progressBar) {
            this.progressBar.setState({ visible: false });
        }
    }
    
    loadError = (error) => {
        this.setState({error: error});
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.progressBar) {
            this.progressBar.setState({ visible: true });
        }
    }
    
    render() {
        
        if (this.state.error) {
            
            return <Snackbar
                open={true}
                transition={Fade}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Network error: {this.state.error.toString()}</span>}
                action={<Button color="accent" dense onClick={()=>this.setState({error: false})}>Reload page</Button>}
            />;

        }
        
        const { location } = this.props;
        
        return location.pathname == '/' ? null : [
            <FakeProgressBar innerRef={progressBar => this.progressBar = progressBar} key="FakeProgressBar"/>,
            <RemoteComponent {...this.props} url={location.pathname} 
                onLoad={this.loadComplete} 
                onError={this.loadError}
                key="RemoteComponent"/>
        ];

    }
 
}
