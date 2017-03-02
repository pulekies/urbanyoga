(function () {
'use strict';

var app = angular.module('UrbanYogaApp', []);

app.controller('UrbanYogaController', UrbanYogaController);
UrbanYogaController.$inject = ['$scope'];


function UrbanYogaController($scope) {
  // TODO: This tab solution is probably not scalable. 
  // It was implemented to quickly prototype having only two sets of tabs. 
  $scope.activeTabs = { 1: 1 } // initialize the second tab to be open on the dashboard for demo purposes. 

    // Set a new tabpage to be active. 
    $scope.setActiveTabPage = function(tabControlId, tabIndex){
      $scope.activeTabs[tabControlId] = tabIndex;
    };

    // Check if a tabpage is active. 
    // If no tabpages are active, sets the first one to be active
    // Note that tab numbers are 1 based. 
    $scope.isTabPageActive = function(tabControlId, tabIndex){
      if($scope.activeTabs[tabControlId] === undefined) {
        $scope.activeTabs[tabControlId] = 0;
      }

      return $scope.activeTabs[tabControlId] === tabIndex;
    };
};

})();