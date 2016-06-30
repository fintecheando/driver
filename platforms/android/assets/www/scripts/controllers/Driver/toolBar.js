'use strict';

angular.module('taxigoDriverApp')
    .controller('toolBarCtrl', ['$scope', '$rootScope' , 'gmaps', '$timeout', 'auth', '$state', 'logger', function ($scope, $rootScope, gmaps, $timeout, auth, $state, logger) {

        // Salir de la aplicación

        $scope.logout = function () {
            var confirm = window.confirm("¿Cerrar sesion?");
            if (confirm == true) {
                auth.logout(function (success) {
                    if (success) {
                        $rootScope.isLogin = false;

                        if(window.socketIo){
                            window.socketIo.disconnect();
                        }

                        $state.go('login');

                    } else {
                    }
                });
            }

        };
        
        $scope.goToCenter = function () { // go to current position on maps

                //$rootScope.notify('Encontrar lugares', 2000);

                //$logger.info('gotoCenter', 'start', true);
                navigator.geolocation.getCurrentPosition(function (position) { // GET POSITION SUCCESS

                       // $logger.info('gotoCenter', 'success', true);

                        //$ionicLoading.hide();

                        gmaps.setCurrentPoint(new L.LatLng(position.coords.latitude, position.coords.longitude));

                        gmaps.map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude), {
                            animate: true,
                            duration: 1
                        });

                        gmaps.map.setZoom(15);
                    },

                    function (error) { /// GET POSITION ERROR

                        //$logger.info('gotoCenter', 'error', error);
                        console.log(error);
                        //$ionicLoading.hide();

                        gmaps.map.panTo(gmaps.currentPoint.getLatLng(), {
                            animate: true,
                            duration: 1
                        });
                        gmaps.map.setZoom(15);
                    }, {timeout: 1500});
            };

        /*Punto de su ubicación actual en el mapa


        $scope.goToCenter = function () {
            console.log('OK to center : ');
            gmaps.direcCenter();
        }*/
    }]);