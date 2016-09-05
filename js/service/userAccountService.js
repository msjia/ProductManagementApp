productManagement.service('userAccountService', ['$resource', 'appSettings', function($resource, appSettings) {
    
    return $resource(appSettings.serverPath + "api/Account/Register", null, {
        'registerUser': {method: 'POST'},
    })

     
}]);