import React from 'react';
import ReactDOM from 'react-dom';

import { teal, blue } from 'material-ui/colors';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { getSnapshot, destroy } from "mobx-state-tree"
import { HashRouter, Route } from 'react-router-dom'

import AppBar from './AppBar';
import Window from './Window';

import ModelAdmin from '../models/Admin';

export default class extends React.Component {
    
    store = null;
    
    constructor(props) {
        super(props);
        this.createStore();
    }
    
    createStore() {
        
        if (this.store) destroy(this.store);
        
        this.store = ModelAdmin.create({
            title: this.props.title
        })
        
    }
    
    render() {
        return (
            <MuiThemeProvider theme={createMuiTheme({
                palette: {
                    primary: teal,
                    secondary: blue,
                }
            })}>
                <HashRouter>
                    <Route render={props => 
                        <div>
                            <AppBar {...props} {...this.props} store={this.store}/>
                            <Window {...props} {...this.props} store={this.store}/> 
                        </div>
                    }/>
                </HashRouter>
            </MuiThemeProvider>
        )
    }
    
}
