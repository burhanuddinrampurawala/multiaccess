import React from 'react';
import ReactDOM from 'react-dom';
import api from '../js/api.js';
import Dashboard from './dashboard.js'
import _ from "lodash";
import { observer } from "mobx-react";
import { observable } from "mobx";
@observer
class Login extends React.Component{
    @observable formData = {
        user: "",
        password: "",
        msg:""  
      };
    
    handleChange = event => {
        this.formData[event.target.id]=event.target.value;
    }
    
    handleSubmit = event => {
        event.preventDefault();
        if(_.isEmpty(this.formData.user))
            this.loginMsg("username cannot be empty");
        else if(_.isEmpty(this.formData.password))
            this.loginMsg("password cannot be empty");
        else{
            const data = {
                user:this.formData.user,
                password:this.formData.password
            }
            api.login(data).then(data=>{
                this.loginMsg(data.message);
                if(data.success)
                    ReactDOM.render(<Dashboard user = {data.user} owner = {data.owner}/>,document.getElementById('helloworld'));
            }).catch(err=>this.loginMsg(JSON.parse(err.responseText).message));
        }
    }
    loginMsg(msg){
        this.formData.msg=msg;
    }
    render(){
        return(
            <div className='newLine'>
                    <form>
                        <div>
                            <label>Username
                                <input type='text' id='user' value={this.formData.user} onChange={this.handleChange.bind(this)}></input>
                            </label>
                        </div>
                        <div>
                            <label>Password
                                <input type='password' id='password' value={this.formData.password} onChange={this.handleChange.bind(this)}></input>
                            </label>
                        </div>
                        <br></br>
                        <label>{this.formData.msg}</label>
                        <button class='login' type='submit' onClick = {this.handleSubmit.bind(this)}>Sign in</button>
                    </form>
            </div>
        );
    }
}
export default Login;