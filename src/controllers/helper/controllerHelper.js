const Mongoose = require('mongoose');

class ControllerHelper {
    
    static isValidId(id) {
        return Mongoose.Types.ObjectId.isValid(id);
    }
}

module.exports = ControllerHelper;