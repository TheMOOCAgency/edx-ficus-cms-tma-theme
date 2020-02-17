function Views($scope,$http,$q,$routeParams,$timeout) {
  //microsite id
  $scope.micrositeId = $routeParams.micrositeId;
  //get microsite url
  $scope.get_url = '/microsite/'+$scope.micrositeId+'/';
  //cgu url
  $scope.cguRequestUrl = '/microsite/manage_cgu/'+$scope.micrositeId+'/';
  //faq url
  $scope.faqRequestUrl = '/microsite/manage_faq/'+$scope.micrositeId+'/';
  //honor url
  $scope.honorRequestUrl = '/microsite/manage_honor/'+$scope.micrositeId+'/';
  //statics _models
  $scope.statics_models = _statics[parseInt($routeParams.micrositeId)];

  //cgu and honor view scope
  $scope.codemirrorCgu = false;
  $scope.codemirrorFaq = false;
  $scope.codemirrorHonor = false;
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
   //models
   //id admin
   $scope.admin = false;
   //static model
   $scope.static = {};
   //advanced model
   $scope.advanced = [];
   $scope.views = false;
   $scope.nav = [];
   $scope.subViews = {
     value:""
   };
   //return static
   $scope.update_static = {
     /*
     primary_color:"",
     logo:"",
     fond:"",
     favicon:""
     */
   };
   //return advanced
   $scope.update_advanced = {

   }

   //cgu
   $scope.cgu_editor = {
     template:$scope.statics_models.cgu.template
   };
   //faq
   $scope.faq_editor = {
     template:$scope.statics_models.faq.template
   };
   //honor
   $scope.honor_editor = {
     template:$scope.statics_models.honor.template
   };

   /*call a l'ouverture de la page*/
   //request get
   get($scope.get_url)
    .then(function (data) {
      // if admin
      $scope.admin = data.admin;
      // microsite name
      $scope.site_name = data.site_name;

      //nav bar
      if(!$scope.admin) {
        // utilisateur normal
        $scope.nav = [
          'static','honor','tos','faq'
        ];
        $scope.static = data.values;
      }else{
        // si utilisateur avancé
        $scope.nav = [
          'static','honor','tos','faq','advanced','administration'
        ];
        //key static
        var static = [
          'primary_color','google_font','bg_img','favicon','logo_image_url'
        ];
        //valeur d'exclusion
        var exclude = [
          'hover_color','language_code'
        ];
        //key de val contenant une image
        var _file = [
          'bg_img','favicon','logo_image_url'
        ]
        //list contenant toutes les key du dict de retour
        var all_keys = Object.keys(data.values);
        for(var i=0;i<all_keys.length;i++) {
          //action d'exclusion
          //verif utilisateur avancé
          var _check = false;
          // valeur excluses
          var _exclude = false;
          // sival est une image
          var _is_file = false;
          // sival est une image
          for(var k = 0;k<_file.length;k++) {
            if(all_keys[i] == _file[k]) {
              _is_file = true;
            }
          }
          //preparation données, si static alors pas d'utilité
          var q = {};
          q[all_keys[i]] = data.values[all_keys[i]];
          q['name'] = all_keys[i];
          // sival est une image
          if(_is_file) {
            q['type'] = 'file';
          }else{
            q['type'] = 'text';
          }
          // si utilisateur ayant acces aux option avancé tri
          for(var j=0;j<static.length;j++) {
            if(static[j] == all_keys[i]) {
              _check = true;
            };
          };
          for(var l=0;l<exclude.length;l++) {
            if(exclude[l] == all_keys[i]) {
              _exclude = true;
            };
          };
          if(!_exclude) {
            if(_check) {
              if(_is_file) {
                $scope.static[all_keys[i]] = data.values[all_keys[i]] +'?'+ new Date().getTime();
              }else{
                 +'?'+ new Date().getTime()
                 $scope.static[all_keys[i]] = data.values[all_keys[i]];
              }
            }else{
              // si utilisateur ayant acces aux option avancé
              $scope.advanced.push(q);
              //$scope.update_advanced[all_keys[i]] = data.values[all_keys[i]];
            }
          }
        }
      }
      //affichage de la vue
      $scope.views = true;
    });
    //action sur le sub nav
    $scope.navClick = function($event) {
      $scope.subViews.value = $event.currentTarget.value;
    };
    //update des static
    $scope.submit_update_static = function() {
      var url = '/microsite/update_static/'+$scope.micrositeId+'/';
      var fd = new FormData();
      _keys = Object.keys($scope.update_static);
      for(var i=0;i<_keys.length;i++) {
        if(_keys[i] == 'logo' || _keys[i] == 'fond' || _keys[i] == 'favicon') {
          fd.append(_keys[i],$scope.update_static[_keys[i]][0]);
        }else{
          fd.append(_keys[i],$scope.update_static[_keys[i]]);
        }
      }
      post(url,fd)
        .then(function(data){
          if(data.status == true) {
            // update views
            $scope.static['primary_color'] = data['primary_color'];
            $scope.static['logo_image_url'] = data['logo_image_url'] +'?'+ new Date().getTime();
            $scope.static['bg_img'] = data['bg_img'] +'?'+ new Date().getTime();
            $scope.static['favicon'] = data['favicon'] +'?'+ new Date().getTime();
            // clear scope
            $scope.update_static = {};
            // clear input file
            angular.element( document.querySelector( '#upload-microsite-logo' ) ).val(null);
            angular.element( document.querySelector( '#upload-microsite-fond' ) ).val(null);
            angular.element( document.querySelector( '#upload-microsite-favicon' ) ).val(null);
          }
        })
    }
    //update des advanced
    $scope.submit_update_advanced = function() {
      if($scope.admin) {
        var url = '/microsite/update_advanced/'+$scope.micrositeId+'/';
        var fd = new FormData();
        _keys = Object.keys($scope.update_advanced);
        for(var i=0;i<_keys.length;i++) {
          fd.append(_keys[i],$scope.update_advanced[_keys[i]]);
        }
        post(url,fd)
          .then(function(data){
            console.log(data);
            if(data.status == true) {
              // change $scope.advanced values
              var all_keys = Object.keys(data);
              for(var i=0;i<all_keys.length;i++) {
                for(var j=0;j<$scope.advanced.length;j++) {
                  for(n in $scope.advanced[j]) {
                    if(n == data[all_keys[i]]) {
                      $scope.advanced[j][all_keys[i]] = data[all_keys[i]];
                    }
                  }
                }
              };
              // clear scope
              $scope.update_advanced = {};
            }
          })
      }
    }
};
