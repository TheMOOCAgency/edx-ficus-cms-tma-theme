angular.module('microsite_manager', ["ngRoute","ngCookies",'ui.codemirror'])
    .run( function run( $http, $cookies ){
        // For CSRF token compatibility with Django
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    })
    .directive("filesInput", function() {
      return {
        require: "ngModel",
        link: function postLink(scope,elem,attrs,ngModel) {
          elem.on("change", function(e) {
            var files = elem[0].files;
            ngModel.$setViewValue(files);
          })
        }
      }
    })
    .controller('Index',Index)
    .controller('Create',Create)
    .controller('Views',Views)
    .controller('viewAdministration',viewAdministration)
    .controller('viewCgu',viewCgu)
    .controller('viewHonor',viewHonor)
    .controller('viewFaq',viewFaq)
    .config(function($routeProvider){
     $routeProvider
     .when("/", {
       templateUrl: _index_template,
       controller: "Index"
     })
     .when("/create", {
       templateUrl: _create_template,
       controller: "Create"
     })
     .when("/views/:micrositeId", {
       templateUrl: _views_template,
       controller: "Views"
     })
     .otherwise({
       redirectTo:'/'
     })
    });
