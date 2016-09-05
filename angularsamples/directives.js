tdBookApp.directive("bundleList", function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/bundle.html',
        replace: true,
        scope: {
            bundles: "=",
            convertToDesc: "&"
        }
    }
    
    
})