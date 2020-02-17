function viewAdministration($scope,$http,$q) {
  // function req GET
  function get(url) {
      var deferred = $q.defer();
      $http.get(url)
          .success(function (data) {
              deferred.resolve(data);
          })
          .error(function (error) {
              deferred.reject(error);
          });

      return deferred.promise;
   }
   //function req POST
   function post(url,formData) {
       var deferred = $q.defer();
       $http.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
       var postData = JSON.stringify(formData);
       $http.post(url,postData)
           .success(function (content) {
               deferred.resolve(content);
           })
           .error(function (error) {
               deferred.reject(error);
           });

       return deferred.promise;
    }
    // models
    $scope.micrositeId = $scope.$parent.micrositeId;
    $scope.get_staff_url = '/microsite/administration/'+$scope.micrositeId+'/';
    $scope.models = {
      staff : []
    }

    get($scope.get_staff_url)
    .then(function (data) {
      if(data.status) {
        $scope.models.staff = data.staff;
      }
    })

    $scope.adminChange = function() {
      var fd = {
        data: {
          true:[],
          false:[]
        }
      }
      var rows = $scope.models.staff;
      for(var i=0;i<rows.length;i++) {
        if(rows[i].admin) {
          fd.data.true.push(rows[i].id);
        }else{
          fd.data.false.push(rows[i].id);
        }
      }
      post($scope.get_staff_url,fd)
        .then(function(data){
          if(data.status == true) {
            console.log(data);
          }
        })
    }
};
