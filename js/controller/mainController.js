productManagement.controller('mainController', function (userAccountService) {
    var vm = this;
    vm.isLoggedIn = false;
    vm.message = "";
    vm.userData = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    vm.registerUser = function () {
        vm.userData.confirmPassword = vm.userData.password;

        userAccountService.registerUser(vm.userData, function (data) {
            vm.confirmPassword = "";
            vm.message = "Registration successful";
            vm.login();
        })
    }

    vm.login = function () {

    }


});