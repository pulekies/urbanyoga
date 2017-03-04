(function () {
    'use strict';

    var app = angular.module('UrbanYogaApp', ['ngMaterial']);

    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('light-green')
          .accentPalette('blue-grey');
    });

    app.controller('UrbanYogaController', UrbanYogaController);
    UrbanYogaController.$inject = ['$scope', '$mdDialog'];

    function UrbanYogaController($scope, $mdDialog) {
        // TODO: This tab solution is probably not scalable. 
        // It was implemented to quickly prototype having only two sets of tabs. 
        $scope.activeTabs = { 1: 1 } // initialize the second tab to be open on the dashboard for demo purposes.
        $scope.tileDetailsExpanded = { 0: true };

        // Set a new tabpage to be active. 
        $scope.setActiveTabPage = function (tabControlId, tabIndex) {
            $scope.activeTabs[tabControlId] = tabIndex;
        };

        // Check if a tabpage is active. 
        // If no tabpages are active, sets the first one to be active
        // Note that tab numbers are 1 based. 
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

        /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
        $scope.toggleResponsiveNav = function () {
            // TODO: this is a quick hack. Replace. 
            var x = document.getElementsByClassName("navbar");
            if (x[0]) {
                x[0].classList.toggle("responsive");
            }
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