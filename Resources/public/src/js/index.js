import React from 'react';
import ReactDOM from 'react-dom';
import RemoteComponent from './utils/remote-component';

var rootElement = document.getElementById('admin_toolbar');
var initProps = JSON.parse(rootElement.getAttribute('data-initProps'));

ReactDOM.render(
    <RemoteComponent {...initProps}/>,
    document.getElementById('admin_toolbar')
);
