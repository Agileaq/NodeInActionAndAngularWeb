/**
 * Created by êÉÁú on 2015/8/19.
 */
function parseField(field) {
    return field.split(/\[|\]/).filter(function(s) {return s});
}
function getField(req, field) {
    var val = req.body;
    field.forEach(function(prop){
       val = val[prop];
    });
    return val;
}

exports.required = function(field) {
    field = parseField(field);
    return function(req, res, next) {
        if(getField(req, field)) {
            next();
        } else {
            res.error(field.join(' ') + ' is required.')
            res.redirect('back');
        }
    }
}
exports.lengthAbove = function(field, len) {
    field = parseField(field);
    return function(req, res, next){
        if(getField(req, field).length > len) {
            next();
        } else {
            res.error(field.join(' ') + ' must have more than ' + len + ' characters');
        }
    }
}