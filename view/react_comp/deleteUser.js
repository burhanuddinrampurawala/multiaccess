import React from "react";
import _ from "lodash";
import api from "../js/api";
import { observer } from "mobx-react";
import { observable } from "mobx"
//import allUsers from "./allUsers.js";
@observer
class deleteUser extends React.Component {
  @observable users=[];
  @observable user='';
  @observable message='';
  delUser(oldUser){
    _.remove(this.users,toRemove=>toRemove===oldUser)
 }
  constructor() {
    super();
    api.getAllUsers().then(data => {
      if (data.success) {
        data.message.map(k => this.users.push(k.username));
        this.delUser(this.props.user);
      }
    });
  }
  validate() {
    return _.isEmpty(this.user);
  }
  handleChange = event => {
    this.user=event.target.value;
  };
  submit = event => {
    event.preventDefault();
    api
      .deleteUser({ user: this.user })
      .then(data => {
        if (data.success) {
          this.delUser(this.user);
        }
        this.msg(data.message);
      })
      .catch(err => this.msg(JSON.parse(err.responseText).message));
  };
  popultateOpts(users) {
    let options = [];
    users.map(user => options.push(<option value={user}>{user}</option>));
    return options;
  }
  msg(msg) {
    this.message = msg
  }
  render() {
    return (
      <div className="newLine">
        <label>
          {" "}
          Delete User
          <select
            id="user"
            value={this.user}
            onChange={this.handleChange.bind(this)}
          >
            <option value='select'>-select user-</option>
            {this.popultateOpts(this.users)}
          </select>
        </label>
        <label>{this.message}</label>
        <button disabled={this.validate()} onClick={this.submit.bind(this)}>
          Delete {this.user}
        </button>
      </div>
    );
  }
}
export default deleteUser;