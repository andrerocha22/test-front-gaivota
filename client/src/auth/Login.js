import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/index";
import "./login.css";
import logo from "../assets/logo192.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/app/home");
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/app/home");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  fillDemoEmail = () => {
    this.setState({ email: "test@test.com" });
  };

  fillDemoPassword = () => {
    this.setState({ password: "test123" });
  };

  render() {
    return (
      <div className="container-login">
        <div className="d-flex justify-content-center">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={logo} className="brand_logo" alt="Logo" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form className="auth-form" noValidate onSubmit={this.onSubmit}>
                <div className="input-group mb-3">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    id="email"
                    type="email"
                    className="auth-input"
                    placeholder="admin@gaivota.ai"
                  />
                </div>
                <div className="input-group mb-2">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    id="password"
                    type="password"
                    className="auth-input"
                    placeholder="admin"
                  />
                </div>
                <div className="d-flex justify-content-center mt-4 login_container">
                  <button className="btn login_btn" type="submit">
                    Login
                  </button>
                </div>
                <div className="bottom-register">
                  <Link to="/login/register" className="link">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.any,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
