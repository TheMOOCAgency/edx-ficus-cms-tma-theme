function Index($scope) {
  $scope.base_models = _base_models;

  $scope.staticFileTemplates = {
  	honor: {},
  	cgu: {}
  }
  console.log(_base_models);
  for(var i=0;i<$scope.base_models.length;i++) {
  	console.log($scope.base_models[i]);
  }

};
