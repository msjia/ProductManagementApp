tdBookApp.service('bookservice', ['$resource', function($resource) {
    
    this.GetDefaultBookPayload = function() {
        var bookAPI = $resource("tdBook/tdBook.json", {}, {get: {method: "GET"}});
        
        // change to real API when it's available
        return bookAPI.get();
        
      };
    
    this.tdBook = this.GetDefaultBookPayload();
     
}]);