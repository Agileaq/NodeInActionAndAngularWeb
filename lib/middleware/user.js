/**
 * Created by ���� on 2015/8/18.
 */
var User = require('../user');
module.exports = function(req, res, next) {
    var uid = req.session.uid;
    if(!uid) return next();
    User.get(uid, function(err, user) {
        if(err) return next(err);
        req.user = res.locals.user = user;
        next();
    });
};