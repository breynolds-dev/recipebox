function RecipeDetailsController(recipe, $scope, $rootScope, $http, $stateParams, $location) {
  var ctrl = this;
  var writingReview = false;

  ctrl.data = recipe.data;

  ctrl.deleteReview = function (id, index) {
    $http.delete('/api/v1/reviews/' + id)
      .success(function (data, status, headers, config) {
        ctrl.data.review_list.splice(index, 1);
      })
      .error(function (data, status, headers, config) {
        console.log('Error in Deleting a review: ' + id);
      })
  }

  ctrl.deleteRecipe = function () {
    $http.delete('/api/v1/recipes/' + ctrl.data.id)
      .success(function (data, status, headers, config) {
        $location.path('/')
      })
      .error(function (data, status, headers, config) {
        console.log('Error in Deleting a review: ' + id);
      })
  }

  ctrl.startWritingReview = function () {
    ctrl.writingReview = true;
  }

  ctrl.clearReviewForm = function() {
    $scope.rating = 1;
    ctrl.reviewForm.reviewText = ''

    ctrl.writingReview = false;
  }

  ctrl.postReview = function() {
    var data = {
      user_id: $rootScope.user.id,
      recipe_id: ctrl.data.id,
      rating: $scope.rating,
      content: ctrl.reviewForm.reviewText
    };

    return $http.post('/api/v1/reviews', data)
      .success(function (data, status, headers, config) {
        ctrl.data.review_list.push(data.review);

        // Clear form on successful submission
        ctrl.clearReviewForm();
      })
      .error(function (data, status, header, config) {
      })
  }
}

angular
  .module('recipeBox')
  .controller('RecipeDetailsController', RecipeDetailsController)
