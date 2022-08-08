import {Types} from 'mongoose';

class ControllerHelper {
    
    static isValidId(id: string) {
        return Types.ObjectId.isValid(id);
    }
}

export default ControllerHelper;