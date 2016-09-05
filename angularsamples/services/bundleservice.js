tdBookApp.service('bundleservice', ['$resource', function($resource) {
    this.GetBundleList = function() {
        var bundleAPI = $resource("tdBook/bundles.json", {}, {get: {method: "GET"}});
        
        // change to real API when it's available
        return bundleAPI.get();
        
  }}]);