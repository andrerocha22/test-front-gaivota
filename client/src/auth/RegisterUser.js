import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/index";
import "./registerUser.css";
import logo from "../assets/logo192.png";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/app/home");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
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
                <label>Name</label>
                <div className="input-group mb-3">
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    id="name"
                    type="text"
                    className="auth-input"
                  />
                </div>
                <label>Email</label>
                <div className="input-group mb-3">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    id="email"
                    type="email"
                    className="auth-input"
                  />
                </div>
                <label>Password</label>
                <div className="input-group mb-2">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    id="password"
                    type="password"
                    className="auth-input"
                  />
                </div>
                <div className="d-flex justify-content-center mt-4 login_container">
                  <button className="btn login_btn" type="submit">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.any,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
