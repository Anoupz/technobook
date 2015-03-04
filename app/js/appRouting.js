'use strict';
angular.module('app.routingScript', ['ui.router'])

    // configure our routes
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                // route for the home page
                .state('/', {
                    abstract: true,
                    templateUrl: 'partials/home.html',
                    controller: 'homeController',
                    controllerAs: 'home'
                })
                .state('/.home', {
                    url: '/',
                    views: {
                        'contact': {
                            templateUrl: 'partials/contact.html',
                            controller: 'contactController',
                            controllerAs: 'contact'
                        },
                        'footer': {
                            templateUrl: 'partials/footer.html'
                        }
                    }
                })

                .state('about', {
                    url: '/about',
                    templateUrl: 'partials/about.html',
                    controller: 'aboutController',
                    controllerAs: 'about'
                })

                .state('contact', {
                    url: '/contact',
                    templateUrl: 'partials/contact.html',
                    controller: 'contactController',
                    controllerAs: 'contact'
                })

                .state('user', {
                    url: '/user',
                    templateUrl: 'partials/user.html',
                    controller: 'userController',
                    controllerAs: 'user'
                });
        }]);