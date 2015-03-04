'use strict';
angular.module('app.pageController', [])

    .controller('homeController', function () {
        var homeCtl = this;
        homeCtl.message = 'You are on Home Page';
    })

    .controller('aboutController', function () {
        var abtCtl = this;
        abtCtl.message = 'You are on About Page';
    })

    .controller('userController', function () {
        var usrCtl = this;
        usrCtl.message = 'You are on User Page';
    })
    .controller('contactController', function () {
        var ctcCtl = this;
        ctcCtl.message = 'You are on Contact Page';
    });

