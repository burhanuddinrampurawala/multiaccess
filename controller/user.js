module.exports = function(tokenRoutes,user){
    tokenRoutes.post('/getuser',(req,res)=>{
        res.json(req.decoded.data);
    })
    tokenRoutes.get('/getallusers',(req,res)=>{
        if(req.decoded.data.owner){
            user.getAll().then(data=>res.json({
                success: true,
                message: data
            }))
            .catch(err=>res.status(500).json({
                success: false,
                message: err
            }))
        }
        else
            res.status(400).json({
                success:false,
                message:  'permission denied'
            });
    })

    tokenRoutes.post('/adduser',(req,res)=>{
        const username = req.body.user;
        const password = req.body.password;
        const permission = req.body.permission;
        const owner =req.decoded.data.owner;
        if(owner){
            const save = user.save(username,password,permission);
            save.then(val=>{
                const data= val.dataValues;
                res.json({
                    success: true,
                    user: data.username,
                    owner: data.owner
                });
            })
            .catch(err=>{;
                res.status(500).json({
                    success: false,
                    message: err
                })
            })
        }
        else
            res.status(400).json({
                success: false,
                message: "permission denied"
            })
    })
    tokenRoutes.post('/deleteuser',(req,res)=>{
        const username = req.body.user;
        const owner = req.decoded.data.owner;
        if(owner){
            const del = user.delete(username);
            del
            .then(val=>
                val==1?res.json({
                    success: true,
                    message: `user ${username} deleted`
                }):res.json({
                    success:false,
                    message: 'user does not exist'
                })
            )
            .catch(err=>res.status(500).json({
                success:false,
                message: 'some error occured please try again later'
            }));
        }
        else
        res.status(400).json({
            success: false,
            message: "permission denied"
        })
        
    })
}