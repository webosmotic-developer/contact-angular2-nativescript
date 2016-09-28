var validator = require("email-validator");

export class Contact {
    _id:string;
    name:string;
    email:string;
    phone:string;
    isValidEmail() {
        return validator.validate(this.email);
    }
}
