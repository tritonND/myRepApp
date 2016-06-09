// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//var app = angular.module('starter', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives']);

var app = angular.module('starter', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider,  $ionicConfigProvider, $httpProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.views.maxCache(0);
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider

   .state('loginUser', {
        url: '/page1',
         data: {
                 username : '',
                 password : ''
               },
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })


      .state('tlActivities', {
        url: '/page2',
          data: {      step: 2   },
          templateUrl: 'templates/tlActivities.html',
        controller: 'activitiesCtrl'
      })

    .state('houActivities', {
      url: '/page12',
      data: {      step: 12   },
      templateUrl: 'templates/houActivities.html',
      controller: 'activitiesCtrl'
    })

      .state('tlSuggestions', {
          url: '/page3',
          data: {      step: 3    },
          templateUrl: 'templates/tlSuggestions.html',
          controller: 'suggestionsCtrl'
      })

    .state('houSuggestions', {
      url: '/page13',
      data: {      step: 13    },
      templateUrl: 'templates/houSuggestions.html',
      controller: 'suggestionsCtrl'
    })

      .state('tlChallenges', {
        url: '/page4',
          data: {      step: 4    },
          templateUrl: 'templates/tlChallenges.html',
        controller: 'challengesCtrl'
      })

    .state('houChallenges', {
      url: '/page14',
      data: {      step: 14    },
      templateUrl: 'templates/houChallenges.html',
      controller: 'challengesCtrl'
    })

      .state('tlPlans', {
        url: '/page5',
          data: {      step: 5    },
          templateUrl: 'templates/tlPlans.html',
        controller: 'plansCtrl'
      })

    .state('houPlans', {
      url: '/page15',
      data: {      step: 15    },
      templateUrl: 'templates/houPlans.html',
      controller: 'plansCtrl'
    })


      .state('tlSummary', {
        url: '/page6',
          data: {      step: 6    },
          templateUrl: 'templates/tlSummary.html',
        controller: 'summaryCtrl'
      })

    .state('houSummary', {
      url: '/page16',
      data: {      step: 16    },
      templateUrl: 'templates/houSummary.html',
      controller: 'summaryCtrl'
    })

  $urlRouterProvider.otherwise('/page1');

})




app.controller('AppCtrl', function($scope, $rootScope, $ionicLoading, $timeout, $ionicPopup)
 {
   // $scope.hideBackButton = false;
    $scope.data = { activities: '',challenges: '',suggestions: '',plans: '', errorMsg: '',
      fullname : '', currentWeekNumber : '', designation : ''
    };

   $scope.show = function() {
     $ionicLoading.show({
      // template: '<p style="color: #7cfc00">Connecting...</p><ion-spinner icon ="ripple"></ion-spinner>'
       template: '<ion-spinner icon ="ripple"></ion-spinner>'
     });
   };

   $scope.hide = function(){
     $ionicLoading.hide();
   };

   //$rootScope.$get.fullname
//  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams)
//    {
//       if ((toState.name == 'done') || (toState.name ==  'step1'))
//         $scope.hideBackButton = true;
//  else
//    $scope.hideBackButton = false;
//    });
});


 //app.constant('ApiEndpoint', { url: 'http://localhost:8100/api'});


app.controller('summaryCtrl', function($scope, $http, $ionicPopup, $ionicLoading)
{
   $scope.submit = function () {
     $scope.show($ionicLoading);
     console.log( $scope.data.activities);
     console.log( $scope.data.suggestions);
     console.log( $scope.data.plans);
     console.log( $scope.data.status);


     $http.post('http://trittons.org/submit.php', {
       activities: $scope.data.activities, challenges: $scope.data.challenges, plans: $scope.data.plans,
       suggestions: $scope.data.suggestions, fullname:  $scope.data.fullname, designation: $scope.data.designation
     }).then(function(response)
     {
       console.log( $scope.data.status);
       if(response.data.status == 200){
         $scope.errorMsg = " ";
         var alertPopup = $ionicPopup.alert({
           title: 'Successful!',
           template: 'Succesfully Submitted Report to the server'
         });
        //alert('inside submit script for tl');
         $scope.hide($ionicLoading);
         window.location.href = 'index.html#/page1';
       }
       else
       { window.location.href = 'index.html#/page2';       }
     },
       function errorCallback(response) {
       //  alert('error');
         var alertPopup = $ionicPopup.alert({
           title: 'Error!',
           template: 'Could not submit to the server'
         });
        // $scope.errorMsg = "Error, Could not submit to the server";

       });
   }
});




app.controller('summaryCtrl1', function($scope, $http, $ionicPopup, $ionicLoading)
{
  $scope.submit = function () {
    $scope.show($ionicLoading);
    console.log( $scope.data.activities1);
    console.log( $scope.data.suggestions1);
    console.log( $scope.data.plans1);

    $http.post('http://trittons.org/submit1.php', {
      activities1: $scope.data.activities1, challenges1: $scope.data.challenges1, plans1: $scope.data.plans1,
      suggestions1: $scope.data.suggestions1, fullname: $scope.data.fullname, designation: $scope.data.designation
    }).then(function(response)
      {

        if(response.data.status == 200){
          console.log( $scope.data.status);
          $scope.errorMsg = " ";
         // alert('inside submit script for hou');
          var alertPopup = $ionicPopup.alert({
            title: 'Successful!',
            template: 'Succesfully Submitted Report to the server'
          });
          $scope.hide($ionicLoading);
          window.location.href = 'index.html#/page1';
        }
        else
        { window.location.href = 'index.html#/page12'; }
      },
      function errorCallback(response) {
      //  alert('error');
        $scope.errorMsg = "Error, Could not submit to the server";

      });
  }
});





 app.controller('loginCtrl', function($scope,$http, $ionicLoading, $ionicPopup) {
         $scope.data.errorMsg = '';
         $scope.data.fullname = '';
            $scope.login = function (){
              $scope.show($ionicLoading);
             //   alert('inside controller');
                console.log( $scope.data.username);
              console.log( $scope.data.password);

              //  $http.post('http://localhost/myappR/www/js/login3.php', { username: $scope.username1, password: $scope.password1 }).then(function(response)
                $http.post('http://trittons.org/login.php', { username: $scope.data.username, password: $scope.data.password }).then(function(response)
                {

                    console.log("inside post");
                        if(response.data.status == 200 && response.data.usertype == "TL"){
                          console.log(response.data.fullname);
                          $scope.data.fullname = response.data.fullname;
                          $scope.data.designation = response.data.designation;
                          $scope.data.currentWeekNumber = response.data.currentWeekNumber;
                          $scope.hide($ionicLoading);
                          var alertPopup = $ionicPopup.alert({
                            title: 'Login Successful!',
                            template: 'Succesfully logged in as Team Lead'
                          });
                       // alert('inside redirection script for tl');
                        window.location.href = 'index.html#/page2';
                    }

                    if(response.data.status == 200 && response.data.usertype == "HOU"){
                      console.log(response.data.fullname);
                      $scope.data.fullname = response.data.fullname;
                      $scope.data.designation = response.data.designation;
                      $scope.data.currentWeekNumber = response.data.currentWeekNumber;
                      $scope.hide($ionicLoading);
                      //alert('inside redirection script for hou');
                      var alertPopup = $ionicPopup.alert({
                        title: 'Login Successful!',
                        template: 'Succesfully logged in as Unit Head'
                      });
                        window.location.href = 'index.html#/page12';
                    }

					else
					$scope.data.errorMsg = "Invalid login credentials. Try Again";
                  $scope.hide($ionicLoading);


                }, function errorCallback(response, $ionicLoading) {
                    //alert('error');
                  $scope.hide($ionicLoading);
                  var alertPopup = $ionicPopup.alert({
                    title: 'Login unsuccessful!',
                    template: 'An error occured. Check login credentials'
                  });
					      $scope.errorMsg = "Login Error, Please Try Again";

                });
            }

        });







app.controller('Step2Ctrl', function($scope)
    {
        $scope.step2Submitted = false;
        $scope.submit = function()
        {
            $scope.step2Submitted = true;
        }
     });


app.controller('activitiesCtrl', function($scope, $rootScope, $state)
    {
      $scope.data.activities = " " + $scope.data.activities;

    });


app.controller('Step3Ctrl', function($scope)
    {
        $scope.step3Submitted = false;
        $scope.submit = function()
        {
            $scope.step3Submitted = true;
        }
     });


app.controller('challengesCtrl', function($scope, $rootScope, $state)
    {


    });


app.controller('Step4Ctrl', function($scope)
    {
        $scope.step4Submitted = false;
        $scope.submit = function()
        {
            $scope.step4Submitted = true;
        }
     });


app.controller('plansCtrl', function($scope, $rootScope, $state)
    {


    });


app.controller('Step5Ctrl', function($scope)
    {
        $scope.step5Submitted = false;
        $scope.submit = function()
        {
            $scope.step5Submitted = true;
        }
     });


app.controller('suggestionsCtrl', function($scope, $rootScope, $state)
    {


    });




app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

