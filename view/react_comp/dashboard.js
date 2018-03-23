import React from 'react';
import AddUser from './addUser.js';
import DeleteUsers from './deleteUser';
import api from '../js/api.js' 
class Dashboard extends React.Component{
    check(){
        if(this.props.owner)
            return(
                <div className='sameLine'>
                    <AddUser/>
                    <DeleteUsers user={this.props.user}/>          
                </div>
            );
        else
            return(<h2>Not Owner</h2>);

    }
    logout=event=>{
        event.preventDefault();
        api.logout().then(location.reload(true))
    }
    render(){
        return(
            <div>
            <h1>Welcome  {this.props.user} to the Dashboard</h1>
                {this.check()}
            <button class='logout' onClick={this.logout.bind(this)}>Logout</button>
            </div>
        );
    }
}
export default Dashboard;