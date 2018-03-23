import React from "react";
import api from "../js/api.js";
import _ from "lodash";
import { observer } from "mobx-react";
import { observable } from "mobx";
@observer
class addUser extends React.Component {
  @observable formData = {
    user: "",
    password: "",
    confirmPassword: "",
    permission: "false",
    message: ""
  };
  handleChange = event => {
      this.formData[event.target.id]=event.target.value;
  };
  submit = event => {
    event.preventDefault();
    if(_.isEmpty(this.formData.user))
        this.msg("username cannot be empty")
    else if(_.isEmpty(this.formData.password))
        this.msg('username cannot be empty')
    else if(!_.isEqual(this.formData.password, this.formData.confirmPassword))
        this.msg('passwords do not match');
    else{
        console.log(this.formData);
        api
      .addUser(this.formData)
      .then(data => this.msg(`user ${data.user} saved`))
      .catch(err => this.msg(JSON.parse(err.responseText).message));
    }
  };
  msg(msg) {
    this.formData.message = msg;
  }
  render() {
    return (
      <div className="newLine">
        <label>
          Username
          <input
            type="text"
            value={this.formData.user}
            id="user"
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={this.formData.password}
            id="password"
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <label>
          Confirm password
          <input
            type="password"
            value={this.formData.confirmPassword}
            id="confirmPassword"
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <label>
          Permission
          <select
            id="permission"
            value={this.formData.permission}
            onChange={this.handleChange.bind(this)}
          >
            <option value="false">Admin</option>
            <option value="true">Owner</option>
          </select>
        </label>
        <button onClick={this.submit.bind(this)}>
          AddUser {this.formData.user}
        </button>
        <label>{this.formData.message}</label>
      </div>
    );
  }
}
export default addUser;
