tdBookApp.controller('bookingController', function($scope, $http, $resource, sofservice, bundleservice, bookservice, tdandbsservice) {
    
    $scope.tdBook = bookservice.tdBook;
    $scope.showVarAmount = false;
    $scope.showVarRadio = false;
    $scope.showVarTable = false;

    $scope.sofResults = sofservice.GetSourceOfFund();
    $scope.bundles = bundleservice.GetBundleList();
    $scope.$watch('bundle', function() {
        if ($scope.bundle == null) {} else {
            $scope.bundleObj = JSON.parse($scope.bundle);
            $scope.tdBook.toProductCode = $scope.bundleObj.prodCode;
            $scope.tdBook.tdinput.tenorCode = $scope.bundleObj.tenorCode;
            $scope.tdBook.toCcyCode  = $scope.bundleObj.ccyCode;
        }
    });
    
    $scope.$watch('tdBook', function() {
        bookservice.tdBook = $scope.tdBook;
    });
    
    $scope.convertToDesc = function(b) {

        if (b.prodCode === "RGPL") { $scope.prodDesc = "Regular TD"; }
        if (b.prodCode === "UFTD") { $scope.prodDesc = "Unfixed TD"; }
        if (b.tenorCode === "M01") { $scope.tenorDesc = "1 Month"; }
        if (b.tenorCode === "M03") { $scope.tenorDesc = "3 Month"; }
        if (b.ccyCode === "SGD") {$scope.ccyDesc = "LCY"; } else {$scope.ccyDesc = b.ccyCode; }
            
        return $scope.tenorDesc + ' ' + $scope.ccyDesc + ' ' + $scope.prodDesc;
    };
    
    $scope.defaultWarning = function() {
        $scope.tdBook.toAmount >= 10000 ? $scope.showVarAmount = false: $scope.showVarAmount = true;
    };
    
    $scope.toggle = function() {
        $scope.showVarRadio = !$scope.showVarRadio;
    };
    
    $scope.reset = function() {
        document.getElementById("inputAmount").value = "";
        document.getElementById("selectBundle").value = "";
        document.getElementById("inputCcy").value = "";
        document.getElementById("inputTenorCode").value = "";
        document.getElementById("inputToProductCode").value = "";
    };
    
    $scope.addToList = function() {
        window.location.href = "#/wait";
        $scope.tdBook = bookservice.tdBook;
    
        $http.post('https://buysell.cfapps-gcg-nonprd.nam.nsroot.net/buyselltimedeposit/booking-preprocess-spa', $scope.tdBook, { headers: { 'Content-Type': 'application/json' }})  
            .success(function(data, status, headers, config) {
                $scope.reviewResult = data;
//              alert("successful message:" + JSON.stringify({data:data}));
                $scope.init();
                window.location.href = "#";
            })
            .error(function(data){
                alert("failure message:" + JSON.stringify({data:data}));
                window.location.href = "#";
            });
    
        $scope.init = function() {
            tdandbsservice.rolloverInstruction = $scope.tdBook.tdinput.rolloverManager.rolloverInstruction;
            tdandbsservice.accountNumber =  $scope.reviewResult.tdoutput.accountNumber;
            tdandbsservice.toProductCode = $scope.tdBook.toProductCode;
            tdandbsservice.toCcyCode = $scope.tdBook.toCcyCode;
            tdandbsservice.tenorCode = $scope.tdBook.tdinput.tenorCode;
            $scope.tdBook.tdinput.principalAmount = $scope.reviewResult.tdoutput.principalAmount;
            tdandbsservice.principalAmount = $scope.reviewResult.tdoutput.principalAmount;
            $scope.tdBook.tdinput.valueDate = $scope.reviewResult.tdoutput.valueDate;
            tdandbsservice.valueDate = $scope.reviewResult.tdoutput.valueDate;
            tdandbsservice.notificationDate = $scope.reviewResult.tdoutput.notificationDate;
            $scope.tdBook.tdinput.maturityDate = $scope.reviewResult.tdoutput.maturityDate;
            tdandbsservice.maturityDate = $scope.reviewResult.tdoutput.maturityDate;
            $scope.tdBook.tdinput.interestRate = $scope.reviewResult.tdoutput.interestRate;
            tdandbsservice.interestRate = $scope.reviewResult.tdoutput.interestRate;
            tdandbsservice.interestAmount = $scope.reviewResult.tdoutput.interestAmount;
            $scope.tdBook.tdinput.interestRateBrenchMark =$scope.reviewResult.tdoutput.interestRateBrenchMark;
            tdandbsservice.interestRateBrenchMark = $scope.reviewResult.tdoutput.interestRateBrenchMark;
        }
    };
    
    /*$scope.addList = function($scope, $http, bookservice) {
        
    }*/
                           
//    $scope.save=function(){  
//       $http({method:'POST',url:'https://buyselltransaction-superstructural-nonmalignance.cfapps2-gcg-nonprd.nam.nsroot.net/td/prebsbooking',params:$scope.tdBook})  
//        .success(function(response)
//        {   
//            $scope.message = response.a;
//        })
//        .error(function(data){
//            alert("failure message:" + JSON.stringify({data:data}));
//        });
//    };
});

tdBookApp.controller('reviewController', function($scope, $http, bookservice, tdandbsservice) {
    window.location.href = "#/wait";
    $scope.tdBook = bookservice.tdBook;
    
    $http.post('https://buysell.cfapps-gcg-nonprd.nam.nsroot.net/buyselltimedeposit/booking-preprocess-spa', $scope.tdBook, {headers:{ 'Content-Type':'application/json' }})  
            .success(function(data, status, headers, config) {  
                $scope.reviewResult = data;
                $scope.init();
                window.location.href = "#/allBSList";
//              alert("successful message:" + JSON.stringify({data:data}));
            })
                .error(function(data){
                alert("failure message:" + JSON.stringify({data:data}));
                window.location.href = "#/";
            });
    
    $scope.init = function() {
        tdandbsservice.fromAccount = $scope.tdBook.fromAccount;
        tdandbsservice.fromProductCode = $scope.tdBook.fromProductCode;
        tdandbsservice.fromCcyCode = $scope.tdBook.fromCcyCode;
        tdandbsservice.rolloverInstruction = $scope.tdBook.tdinput.rolloverManager.rolloverInstruction;
        tdandbsservice.sourceAmount = $scope.reviewResult.sourceAmount;
        tdandbsservice.destinationAmount = $scope.reviewResult.destinationAmount;
        tdandbsservice.transactionAmountLCY = $scope.reviewResult.transactionAmountLCY;
        tdandbsservice.transactionAmountUSD = $scope.reviewResult.transactionAmountUSD;
        tdandbsservice.fxrate = $scope.reviewResult.fxrate;
        $scope.tdBook.tdinput.accountNumber = $scope.reviewResult.tdoutput.accountNumber;
        tdandbsservice.accountNumber =  $scope.reviewResult.tdoutput.accountNumber;
        $scope.tdBook.tdinput.productCode = $scope.reviewResult.tdoutput.productCode;
        tdandbsservice.productCode = $scope.reviewResult.tdoutput.productCode;
        $scope.tdBook.tdinput.currencyCode = $scope.reviewResult.tdoutput.currencyCode;
        tdandbsservice.currencyCode = $scope.reviewResult.tdoutput.currencyCode;
        $scope.tdBook.tdinput.tenorCode = $scope.reviewResult.tdoutput.tenorCode;
        tdandbsservice.tenorCode = $scope.reviewResult.tdoutput.tenorCode;
        $scope.tdBook.tdinput.principalAmount = $scope.reviewResult.tdoutput.principalAmount;
        tdandbsservice.principalAmount = $scope.reviewResult.tdoutput.principalAmount;
        $scope.tdBook.tdinput.valueDate = $scope.reviewResult.tdoutput.valueDate;
        tdandbsservice.valueDate = $scope.reviewResult.tdoutput.valueDate;
        tdandbsservice.notificationDate = $scope.reviewResult.tdoutput.notificationDate;
        $scope.tdBook.tdinput.maturityDate = $scope.reviewResult.tdoutput.maturityDate;
        tdandbsservice.maturityDate = $scope.reviewResult.tdoutput.maturityDate;
        $scope.tdBook.tdinput.interestRate = $scope.reviewResult.tdoutput.interestRate;
        tdandbsservice.interestRate = $scope.reviewResult.tdoutput.interestRate;
        tdandbsservice.interestAmount = $scope.reviewResult.tdoutput.interestAmount;
        $scope.tdBook.tdinput.interestRateBrenchMark =$scope.reviewResult.tdoutput.interestRateBrenchMark;
        tdandbsservice.interestRateBrenchMark = $scope.reviewResult.tdoutput.interestRateBrenchMark;
        $scope.tdBook.transactionId = $scope.reviewResult.transactionId;
    }
    
    
//	$http.get('tdBook/tdBook.json').success(function(data) {
//        	   $scope.tdBooks = data;
//             })
//            .error(function(data){
//                alert($scope.message = JSON.stringify({data:data}));
//            });
    
});

tdBookApp.controller('restfulCtrl', function($scope, tdBook){
    $scope.tdBooks = tdBook.query();
});

tdBookApp.controller('allTDListController', function($scope, tdandbsservice) {
    $scope.rolloverInstruction = tdandbsservice.rolloverInstruction;
    $scope.accountNumber = tdandbsservice.accountNumber;
    $scope.toProductCode = tdandbsservice.toProductCode;
    $scope.toCcyCode = tdandbsservice.toCcyCode;
    $scope.tenorCode = tdandbsservice.tenorCode;
    $scope.principalAmount = tdandbsservice.principalAmount;
    $scope.valueDate = tdandbsservice.valueDate;
    $scope.notificationDate = tdandbsservice.notificationDate;
    $scope.maturityDate = tdandbsservice.maturityDate;
    $scope.interestRate = tdandbsservice.interestRate;
    $scope.interestAmount = tdandbsservice.interestAmount;
    $scope.interestRateBrenchMark = tdandbsservice.interestRateBrenchMark;
    
    var data = "";
    data += "<div class='row'>" +
                    "<div class='col-md-1'></div>" + 
                        "<div class='col-md-10'>" + 
                            "<div class='col-xs-12 table-responsive'>" + 
                                "<table class='table table-striped'>" +
                                    "<tbody>" +
                                        "<tr>" +
                                            "<td>rolloverInstruction</td>" +
                                            "<td>accountNumber</td>" +
                                            "<td>productCode</td>" +
                                            "<td>currencyCode</td>" +
                                            "<td>tenorCode</td>" +
                                            "<td>principalAmount</td>" +
                                            "<td>valueDate</td>" +
                                            "<td>notificationDate</td>" +
                                            "<td>maturityDate</td>" +
                                            "<td>interestRate</td>" +
                                            "<td>interestAmount</td>" +
                                            "<td>interestRateBrenchMark</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>" + $scope.rolloverInstruction  + "</td>" +
                                            "<td>" + $scope.accountNumber + "</td>" +
                                            "<td>" + $scope.toProductCode + "</td>" +
                                            "<td>" + $scope.toCcyCode + "</td>" +
                                            "<td>" + $scope.tenorCode + "</td>" +
                                            "<td>" + $scope.principalAmount + "</td>" +
                                            "<td>" + $scope.valueDate + "</td>" +
                                            "<td>" + $scope.notificationDate + "</td>" +
                                            "<td>" + $scope.maturityDate + "</td>" +
                                            "<td>" + $scope.interestRate + "</td>" +
                                            "<td>" + $scope.interestAmount + "</td>" +
                                            "<td>" + $scope.interestRateBrenchMark + "</td>" +
                                        "</tr>";
    data += "</tbody>";
    data +="</table>";
    data += "</div>";
    data += "</div>";
    data += "</div>";
    document.getElementById("AllTD").innerHTML = data;
});

tdBookApp.controller('allBSListController', function($scope, $http, bookservice, tdandbsservice) {
    
    $scope.tdBook = bookservice.tdBook;
    $scope.fromAccount = tdandbsservice.fromAccount;
    $scope.fromProductCode = tdandbsservice.fromProductCode;
    $scope.fromCcyCode = tdandbsservice.fromCcyCode;
    $scope.rolloverInstruction = tdandbsservice.rolloverInstruction;
    $scope.sourceAmount = tdandbsservice.sourceAmount;
    $scope.destinationAmount = tdandbsservice.destinationAmount;
    $scope.transactionAmountLCY = tdandbsservice.transactionAmountLCY;
    $scope.transactionAmountUSD = tdandbsservice.transactionAmountUSD;
    $scope.fxrate = tdandbsservice.fxrate;
    $scope.accountNumber = tdandbsservice.accountNumber;
    $scope.productCode = tdandbsservice.productCode;
    $scope.currencyCode = tdandbsservice.currencyCode;
    $scope.tenorCode = tdandbsservice.tenorCode;
    $scope.principalAmount = tdandbsservice.principalAmount;
    $scope.valueDate = tdandbsservice.valueDate;
    $scope.notificationDate = tdandbsservice.notificationDate;
    $scope.maturityDate = tdandbsservice.maturityDate;
    $scope.interestRate = tdandbsservice.interestRate;
    $scope.interestAmount = tdandbsservice.interestAmount;
    $scope.interestRateBrenchMark = tdandbsservice.interestRateBrenchMark;
    
    
    $scope.save = function() {
        window.location.href = "#/wait";
        $http.post('https://buysell.cfapps-gcg-nonprd.nam.nsroot.net/buyselltimedeposit/booking-confirmation-spa', $scope.tdBook, {headers:{ 'Content-Type':'application/json' }}) 
            .success(function(response) {  
                alert("transaction successful:");
                window.location.href = "#";
            })
            .error(function(data){
                alert("failure message:" + JSON.stringify({data:data}));
                window.location.href = "#/allBSList";
            });
    };
});

tdBookApp.controller('payController', function($scope, sofservice, bookservice){
    $scope.sofResults = sofservice.GetSourceOfFund();
    $scope.tdBook = bookservice.tdBook;  
});