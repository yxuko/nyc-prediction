import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Basemap } from './components';

/**
 * COMPONENT
 */

class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route component={Basemap} />
                </Switch>
            </div>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {},
    };
};

export default withRouter(connect(null, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
};
