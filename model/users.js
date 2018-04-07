const {sequelize,Sequelize} = require('./dbConnection.js');
const lodash = require('lodash');
const jwt = require('jsonwebtoken');
const crypter = require('./crypter.js')
const User = sequelize.define('user',{
	unique_id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV1,
		primaryKey: true
	},
	username:{type: Sequelize.STRING},
	password:{type: Sequelize.STRING},
	owner:{type: Sequelize.BOOLEAN}
});
User.sync({force:false});
const app = {};
app.authenticate = async function (user,password,owner){
	const data = await  User.findAll({
		attributes:["owner","username","password"],
		where:{
			username:user
		}
	});
	if(lodash.isEmpty(data))
		return {
			success: false,
			message: 'incorrect username'
		};
	
	const val = data[0].dataValues;
	const success = await crypter.confirm(val.password,password);
	if(success){
		const token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60),
			data: {
				user:val.username,
				owner: val.owner
			}
		},process.env.secret);
		return {
			success: true,
			owner:val.owner,
			user:val.username,
			message: 'successful login',
			token:token
		};
	
	}
	else
		return {
			success: false,
			user:val.username,
			message:'incorrect password'
		};
		
}
app.save = async function(username,password,owner){
	const user = await isUserPresent(username);
	if(user){
		const hash = await crypter.hash(password); 
		const user = User.build({
			username: username,
			password: hash,
			owner: owner
		})
		return await user.save();
	}
	else{
		return new Promise((resolve, reject)=>{
			reject('user already present');
		})
	}
}
app.delete = async function(username){
	return await User.destroy({
		where: {
			username:username
		}
	})
}
function isUserPresent(username){
	return User.findAll({
		attributes:["username"],
		where:{
			username:username,
		}
	}).then(data=> lodash.isEmpty(data))
	.catch(err=>err);
}
app.getAll = ()=>{
	return User.findAll({attributes:['username']})
}
module.exports = app;
