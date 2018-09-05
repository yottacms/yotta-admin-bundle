import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { pink, teal } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { getSnapshot, destroy } from "mobx-state-tree"
import { Provider } from "mobx-react";
import { HashRouter, Route } from 'react-router-dom'

import AppBar from './AppBar';
import ModuleWindow from './Window';

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
            title: 'Loading...'
        });

    }

    render() {
        return (
            <MuiThemeProvider theme={createMuiTheme({
                palette: {
                    primary: teal,
                    secondary: pink,
                }
            })}>
                <Provider store={this.store}>
                    <HashRouter>
                        <Fragment>
                            <Route render={props =>
                                <AppBar {...props} {...this.props} store={this.store}/>
                            }/>
                            <Route path="/yotta" render={props =>
                                <ModuleWindow {...props} {...this.props} store={this.store}/>
                            }/>
                        </Fragment>
                    </HashRouter>
                </Provider>
            </MuiThemeProvider>
        )
    }

}
