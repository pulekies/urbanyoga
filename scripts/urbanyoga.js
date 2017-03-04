(function () {
    'use strict';

    var app = angular.module('UrbanYogaApp', ['ngMaterial']);

    app.config(function ($mdThemingProvider) {
      // Extend light-green palette
      var customLightGreen = $mdThemingProvider.extendPalette('light-green', {
        'A100': '#ecf7f2',
        '800' : '#5f6865',
        '300': '#bad69d',
        '500': '#709582'
      });

      // Register the new color palette map with the name <code>neonRed</code>
      $mdThemingProvider.definePalette('custom-light-green', customLightGreen);
            $mdThemingProvider.theme('default')
              .primaryPalette('custom-light-green')
              .accentPalette('blue-grey');
        });

    app.controller('UrbanYogaController', UrbanYogaController);
    UrbanYogaController.$inject = ['$scope', '$mdDialog'];

    function UrbanYogaController($scope, $mdDialog) {
        $scope.activeTabs = { 1: 1 } // initialize the second tab to be open on the dashboard for demo purposes.
        $scope.tileDetailsExpanded = { 0: true };
        $scope.navBarOpen = false;

        // Set a new tabpage to be active. 
        $scope.setActiveTabPage = function (tabControlId, tabIndex) {
            $scope.activeTabs[tabControlId] = tabIndex;
            $scope.navBarOpen = false; // close the navbar if it is open
        };

        // Check if a tabpage is active. If none active, set the first one to be active
        $scope.isTabPageActive = function (tabControlId, tabIndex) {
            if ($scope.activeTabs[tabControlId] === undefined) {
                $scope.activeTabs[tabControlId] = 0;
            }

            return $scope.activeTabs[tabControlId] === tabIndex;
        };

        // Toggle a card's details open/closed
        $scope.toggleCardDetails = function (cardId) {
            $scope.tileDetailsExpanded[cardId] = !$scope.tileDetailsExpanded[cardId];
        };

        // Toggle the responsive navbar open/close state.  
        $scope.toggleResponsiveNav = function () {
            $scope.navBarOpen = !$scope.navBarOpen;
        }

        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'newProgramDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };

            $scope.onlineSchedulingAllowed = true;

            $scope.selectedProgramType = 1;
            $scope.programTypes = [
              { label: 'Count Series', value: 1 },
              { label: 'Time Series', value: 2 },
              { label: 'Membership', value: '3'},
            ];

            $scope.defaultCapacity = 40;
            $scope.selectedTabs = [];
            $scope.allTabs = ['Classes',
              'Appointments',
              'Workshops',
              'Outside',
              'Inside',
              'Gym'
            ];

            $scope.toggle = function (item, list) {
              var idx = list.indexOf(item);
              if (idx > -1) {
                  list.splice(idx, 1);
              }
              else {
                  list.push(item);
              }
            };

            $scope.exists = function (item, list) {
                return list.indexOf(item) > -1;
            };
        }

    };
})();