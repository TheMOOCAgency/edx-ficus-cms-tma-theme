function viewFaq($scope,$q,$http,$timeout) {
   //function req POST
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
  //editor params
  $scope.editorOptions = {
    lineNumbers: true,
    lineWrapping:true,
    mode: 'xml',
    autofocus:true,
    fixedGutter:true
  };
  // codemirror refresh
  $scope.refreshCodemirror = true;
  $timeout(function () {
    $scope.refreshCodemirror = false;
  }, 100);

  $scope.micrositeId = $scope.$parent.micrositeId;

  //requests post
   $scope.submit_faq = function() {
     var fd = new FormData();
     _keys = Object.keys($scope.$parent.faq_editor);
     for(var i=0;i<_keys.length;i++) {
       fd.append(_keys[i],$scope.$parent.faq_editor[_keys[i]]);
     }
     post($scope.$parent.faqRequestUrl,fd)
       .then(function(data){
         console.log(data);
         if(data.status == true) {
           console.log(data);
         }
       })
   }
};
