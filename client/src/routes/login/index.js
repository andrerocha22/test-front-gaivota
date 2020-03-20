import React, { Component } from "react";
import "../../styles/Login.css";
import logo from "../../assets/logo192.png";
// import { withRouter } from "react-router-dom";
// import { authenticate } from "../../auth";
// import { PropTypes } from "prop-types";

// const Login = props => {
//   const { history } = props;
//   const [loginForm, setLoginForm] = useState({
//     email: "",
//     password: ""
//   });

// /**
//  * Handle the input change and changes the form state
//  * @function handleChange
//  * @param {String} key - Form field key
//  * @returns {Function} On change event handler
//  */
// const handleChange = key => ({ target }) => {
//   setLoginForm({ ...loginForm, [key]: target.value });
// };

// /**
//  * Submit the login form and handles the response
//  * @function handleSubmit
//  * @param {Event} e - Submit event
//  */
// const handleSubmit = async e => {
//   e.preventDefault();
//   e.stopPropagation();
//   const { email, password } = loginForm;
//   try {
//     // Here you can store the userData in any way
//     const userData = await authenticate(email, password);
//     console.log(userData);
//     history.push("/app/home");
//   } catch (e) {
//     console.error(e);
//   }
// };

export default class index extends Component {
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
              <form>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name=""
                    className="form-control input_user"
                    id="email"
                    placeholder="admin@gaivota.ai"
                  />
                </div>
                <div className="input-group mb-2">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="admin"
                  />
                </div>
                <div className="d-flex justify-content-center mt-4 login_container">
                  <a
                    href="/"
                    type="button"
                    name="button"
                    className="btn login_btn"
                  >
                    Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// };

// Login.propTypes = {
//   history: PropTypes.object
// };

// export default withRouter(Login);
