tdBookApp.service('sofservice', ['$resource', function($resource) {
    this.GetSourceOfFund = function() {
        var sofAPI = $resource("tdBook/sofResults.json", {}, {get: {method: "GET"}});
        
        // change to real API when it's available
        return sofAPI.get();
        
  }}]);