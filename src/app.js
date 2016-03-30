import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import AngularUiRouter from 'angular-ui-router';
import Firebase from 'firebase';
import AngularFire from 'angularfire';

angular
    .module('appAuth', [
        AngularUiRouter,
        AngularFire,
    ])
    .config(config);

/* @ngInject */
function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}
