module.exports = function(app,user,tokenRoutes){
    
    app.post('/login',(req,res)=>{
        const username = req.body.user;
        const password = req.body.password;
        const auth = user.authenticate(username,password);
        auth.then(val=> {
            res.set({
                'Set-Cookie': `codestrike_session=${val.token}; Secure: true; HttpOnly: true; SameSite=Strict; Path=/api; Domain=127.0.0.1`,
            });
            delete val.token;
            res.json(val);
        }).catch(err=>res.json({
            success: false,
            message: 'some error occured'
        })
    );
    
    })
    tokenRoutes.post('/logout',(req,res)=>{
        res.set({
            'Set-Cookie': `codestrike_session=''; Secure: true; HttpOnly: true; SameSite=Strict; Path=/api; Domain=127.0.0.1`,
        });
        res.json({success:true});
    })

}