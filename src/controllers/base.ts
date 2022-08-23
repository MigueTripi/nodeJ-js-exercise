import {Types} from 'mongoose';

class ControllerBase {
    
    static isValidId(id: string) {
        return Types.ObjectId.isValid(id);
    }
}

export default ControllerBase;