

class ValidationError {
    constructor(errors){
        this.errors = errors; 
    }

    getErrorString(){
        return this.errors.reduce((acc, val) => acc.concat(val.param).concat(', '), '');
    }

    createResponseObject(){
       return { 
            error: true,
            message: `Error in form inputs - server validation: ${this.getErrorString()}`, 
            invalids: errors 
        }
    }

}

module.exports = ValidationError;