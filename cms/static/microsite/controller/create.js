function Create($scope,$http,$q,$location,$window) {

  function post(url,fd) {
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: url,
          headers: {
            'Content-Type': undefined
          },
          data: fd,
          transformRequest: angular.identity
      })
      .success(function (data) {
          deferred.resolve(data);
      })
      .error(function (error) {
          deferred.reject(error);
      });
      return deferred.promise;
   }

  $scope.create = {
    display_name:"",
    primary_color:"",
    language:"",
    logo:"",
    fond:"",
    favicon:"",
    google_font:""
  };

  $scope.submit = function() {
    var url = '/create-microsite/';
    var fd = new FormData();
    _keys = Object.keys($scope.create);
    for(var i=0;i<_keys.length;i++) {
      console.log(_keys[i]);
      if(_keys[i] == 'logo' || _keys[i] == 'fond' || _keys[i] == 'favicon') {
        fd.append(_keys[i],$scope.create[_keys[i]][0]);
      }else{
        fd.append(_keys[i],$scope.create[_keys[i]]);
      }
    }
    post(url,fd)
      .then(function(data){
        console.log(data);
        if(data.status == true) {
          $window.location.href = '/microsite';
        }
      })

  }

};
