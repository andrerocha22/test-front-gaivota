import React from "react";

export default function FormCreditCard() {
  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md">
            <label>Email</label>
            <input type="email" className="form-control" id="inputEmail4" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md">
            <label>Password</label>
            <input type="password" className="form-control" id="inputEmail4" />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "150px", fontWeight: "500", letterSpacing: "1px" }}
          onClick={() => {
            alert("Login Confirmed!");
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
