var calcSimple = angular.module('calcSimple', []);

calcSimple.controller('calcController', ['$scope', function($scope) {
    $scope.buttons = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9',
        '*', '0', '.', '=', '/'];

    $scope.getValue = function() {
        if ($scope.outputString) {
            $scope.inputString = undefined;
            $scope.outputString = undefined;
        }
        if (this.button != '=') {
            if ($scope.inputString) {
                $scope.inputString = $scope.inputString + this.button;
            } else {
                $scope.inputString = this.button;
            }
        } else {
            try {
                var str = $scope.inputString.replace(',', '.');
                var equal = eval(str);
                $scope.outputString = equal;
            }
            catch(error) {
                $scope.outputString = 'ERROR';
            }
        }
    };

    $scope.canelCalc = function() {
        $scope.inputString = undefined;
        $scope.outputString = undefined;
    };

    $scope.backspace = function() {
        try {
            $scope.inputString =
                $scope.inputString.substring(0, $scope.inputString.length - 1);
        }
        catch(error) {
            $scope.canelCalc();
        }
    };

    $scope.calcByKeys = function() {
        $('.calc_input').focus();
        if ($scope.outputString && event.keyCode != 13 && event.keyCode != 18
            && event.keyCode != 17 && event.keyCode != 16) {
            $scope.inputString = undefined;
            $scope.outputString = undefined;
        }
        if (event.keyCode == 13) { // Enter
            event.preventDefault();
            if ($scope.inputString) {
                try {
                    var str = $scope.inputString.replace(',', '.');
                    var equal = eval(str);
                    $scope.outputString = equal;
                }
                catch(error) {
                    $scope.outputString = 'ERROR';
                }
            }
        }

        if (event.keyCode == 27) { // ESC
            $scope.canelCalc();
        }

        if (event.keyCode == 8) { // Backspace
            event.preventDefault();
            try {
                $scope.inputString =
                    $scope.inputString.substring(0, $scope.inputString.length - 1);
            }
            catch(error) {
                $scope.canelCalc();
            }
        }
    };
}]);
