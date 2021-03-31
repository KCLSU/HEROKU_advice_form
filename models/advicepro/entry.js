

class Entry {

    constructor(id, data){
        this.userAgent = this.createSubmission();
        this.id = id;
        this.lastName = data.lastname;
        this.package = this.createPackage(data)
    }

    createPackage(){
        return {
            ...this.getUserAgent(),
            ...data
        }
    }

    getUserAgent() {
        var ua = parser(req.headers['user-agent']);
        return {
            browser: ua.browser.name || '',
            browserversion: ua.browser.version || '',
            device: ua.device.type || '',
            deviceVendor: ua.device.vendor || '',
            ua: ua.ua,
            lastname: this.lastName 
        };
    }

}


module.exports = Entry;