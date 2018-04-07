module.exports = function(tokenRoutes,user){
    tokenRoutes.post('/getuser',(req,res)=>{
        res.json(req.decoded.data);
    })
    const master = (req, res, next) => {
        if (req.decoded.data.owner) next();
        else
        res.status(400).json({
            success: false,
            message: "permission denied"
        });
    };
    tokenRoutes.use(master);
    tokenRoutes.get('/getallusers',(req,res)=>{
        user.getAll().then(data=>res.json({
            success: true,
            message: data
        }))
        .catch(err=>res.status(500).json({
            success: false,
            message: err
        }))
    })
    tokenRoutes.post('/adduser',(req,res)=>{
        const username = req.body.user;
        const password = req.body.password;
        const permission = req.body.permission;
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
    })
    tokenRoutes.post('/deleteuser',(req,res)=>{
        const username = req.body.user;
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
        
    })
}