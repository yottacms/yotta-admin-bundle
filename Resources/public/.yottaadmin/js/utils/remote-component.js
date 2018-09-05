import React from 'react';
import PropTypes from 'prop-types';

export default class RemoteComponent extends React.Component {

    static propTypes = {
        onLoad: PropTypes.func,
        onError: PropTypes.func,
        url: PropTypes.string.isRequired,
    };

    static defaultProps = {
        onLoad: () => {},
        onError: () => {}
    }

    state = {
        Component: null,
        Props: null
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._componentAsyncLoad(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextState.Component) {
            return true;
        }

        return false;

    }

    render() {
        return this.state.Component ? <this.state.Component {...this.state.Props} /> : null;
    }

    _componentAsyncLoad(props) {

        const { url, onLoad, onError } = props;

        this._loadScript(url, this.props)
            .then(({Component, Props}) => {
                this.setState({Component, Props});
                onLoad();
            })
            .catch(function(err) {
                onError(err);
            });

    }

    _loadScript(url, props) {

        return fetch(url)
            .then(res => res.text())
            .then(source => {

                if (this._isJSON(source)) {
                    let componentInfo = JSON.parse(source);
                    return this._loadScript(componentInfo.url, {...props, ...componentInfo})
                }

                try {
                    var exports = Function('return ' + source)();
                        _return = exports.__esModule ? exports.default : exports;
                } catch(error) {
                    var _return = () => <div dangerouslySetInnerHTML={{__html: source}}/>;
                }

                if (typeof(_return) != "function") {
                    throw Error('Loaded component is not React. Typeof(' + url + ') = ' + typeof(_return));
                }

                return {
                    Component: _return,
                    Props: props
                };

            })

    }

    _isJSON(str) {

        try {
            return (JSON.parse(str) && !!str);
        } catch (e) {
            return false;
        }

    }

}
