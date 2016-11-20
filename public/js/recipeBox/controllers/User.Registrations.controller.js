function UserRegistrationsController($scope, $location, $auth) {
  $scope.handleRegBtnClick = function() {
    $auth.submitRegistration($scope.registrationForm)
      .then(function() {
        $auth.submitLogin({
          email: $scope.registrationForm.email,
          password: $scope.registrationForm.password
        });
      });
  };
}

angular
  .module('recipeBox')
  .controller('UserRegistrationsController', UserRegistrationsController)