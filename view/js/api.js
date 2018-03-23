import $ from 'jquery';

const lib = {};
lib.API_URL = "http://127.0.0.1";
const request = (url,method,data,dataType)=>{
    method = method || 'GET';
    
    return $.ajax({
        url: `${lib.API_URL}${url}`,
        xhrFields:{
            withCredentials: true
        },
        headers: {
            "Access-Control-Allow-Credentials" : true,
            "poweredup":true
        },
        method: method,
        contentType: dataType,
        data: data,
        success: function(res){
            console.log("received ajax res for", url, method);
            return res;
        }
    });
}
lib.getUser = ()=>request('/api/getuser/','post');
lib.login = data=>request('/login','post',data);
lib.logout = ()=>request('/api/logout','post');
lib.addUser = data=>request('/api/adduser','post',data);
lib.deleteUser = data=>request('/api/deleteuser','post',data);
lib.getAllUsers = ()=>request('/api/getallusers','get');
export default lib;
