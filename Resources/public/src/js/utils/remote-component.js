import React from 'react';
import PropTypes from 'prop-types';

export default class RemoteComponent extends React.Component {

    static propTypes = {
        onLoad: PropTypes.func,
        url: PropTypes.string.isRequired,
    };
    
    static defaultProps = {
        onLoad: () => {}
    }
    
    state = {
        Component: null,
        Props: null
    }
    
    componentDidMount() {
    
        const { onLoad, url } = this.props;
        
        this._loadScript(url, this.props)
            .then(({Component, Props}) => {
                this.setState({Component, Props});
                onLoad();
            });

    }

    render() {
        return this.state.Component ? <this.state.Component {...this.state.Props}/> : null;
    }
    
    _loadScript(url, props) {
    
        return fetch(url)
            .then(res => res.text())
            .then(source => {
            
                if (this._isJSON(source)) {
                    let componentInfo = JSON.parse(source);
                    return this._loadScript(componentInfo.url, componentInfo)
                }
            
                try {
                    var exports = Function('return ' + source)(),
                        _return = exports.__esModule ? exports.default : exports;
                } catch(error) {
                    var _return = () => <div dangerouslySetInnerHTML={{__html: source}}/>;
                }
                
                return {
                    Component: _return, 
                    Props: props
                };
                
            });
            
    }
    
    _isJSON(str) {
        
        try {
            return (JSON.parse(str) && !!str);
        } catch (e) {
            return false;
        }
        
    }

}
