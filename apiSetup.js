module.exports = function(express, bodyParser, helmet, morgan, jwt) {
    const tokenRoutes = express.Router();
    const app = express();
    const server = app.listen(8000, "0.0.0.0", function() {
        console.log(
            "server is running on http://%s:%s",
            server.address().address,
            server.address().port
        );
    });
    tokenRoutes.use(function(req, res, next) {
        // console.log('headers',req.headers);
        let token;
        try {
            token = req.headers.cookie
            .split(";")[0]
            .replace(/codestrike_session=/g, "");
        } catch (err) {
            token = false;
            console.log(err);
        }
        if (token) {
            jwt.verify(token, process.env.secret, function(err, decoded) {
                if (err) {
                    return res
                    .status(403)
                    .json({ success: false, message: "Failed to authenticate token." });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: "No cookie provided."
            });
        }
    });
    const customHeader = express.Router();
    customHeader.use(function(req, res, next) {
        res.set({
            "Access-Control-Allow-Origin": "http://127.0.0.1/",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "*"
        });
        const header = req.headers.poweredup;
         if (!header) {
            const err = new Error("Invalid Request");
            err.status = 400;
            next(err);
        } 
        else next();
    });
    const redirect = (err, req, res, next) => {
        console.log("inside redirect")
        console.log(err.status);
        if (err.status === 404 || err.status === 400) res.redirect("/");
        next();
    };
    app.use(express.static(__dirname + "/view"));
    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(helmet.noCache());
    app.use(customHeader);
    app.use(redirect);
    app.use("/api", tokenRoutes);
    return {
        app: app,
        tokenRoutes: tokenRoutes
    };
};
