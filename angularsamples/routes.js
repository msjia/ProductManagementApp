tdBookApp.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'pages/TDbookForm.html',
        controller: 'bookingController'
      }).
    when('/review', {
        templateUrl: 'pages/Pay.html',
        controller: 'reviewController'
      }).
    when('/allTDList', {
         templateUrl: 'pages/AllTDList.html',
         controller: 'allTDListController'
      }).
    when('/wait', {
         templateUrl: 'pages/WaitPage.html',
         controller: ''
      }).
    when('/allBSList', {
         templateUrl: 'pages/TDbookReview.html',
         controller: 'allBSListController'
      }).
    when('/pay', {
         templateUrl: 'pages/Pay.html',
         controller: 'payController'
      });
  });