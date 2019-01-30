import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { auth } from '../actions/user';

export default function(ComposedClass, reload, adminRoute = null) {
  class Auth extends Component {
    state = {
      loadding: true,
    };

    componentDidMount = () => {
      this.props.auth().then(response => {
        let user = this.props.user.userData;

        if (!user.isAuth) {
          if (reload) {
            this.props.history.push('/register');
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push('/user/dashboard');
          } else if (reload === false) {
            this.props.history.push('/user/dashboard');
          }
        }

        this.setState({
          loadding: false,
        });
      });
    };

    render() {
      const { loadding } = this.state;
      const { user } = this.props;
      if (loadding) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: '#2196f3' }} thickness={7} />
          </div>
        );
      }

      return <ComposedClass {...this.props} user={user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }

  const mapDispatchToProps = {
    auth,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth);
}
