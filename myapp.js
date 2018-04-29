var myapp = angular.module('myapp',[]);

myapp.controller('employeesController', function ($scope,$http) {

    $scope.newEmployee={};
    $scope.listEmployees=[];
    $scope.propertyName= 'firstName';
    $scope.reverse= true;
    $scope.employeeClick=null;
    $scope.clickFlag=false;
    $http.get('employees.json').
        then(function onSuccess (response) {
            $scope.listEmployees=response.data.Employees;


    }).catch(function onError(response) {
        console.log(response)
    })

    $scope.del= function (index) {
        if (confirm("Are you sure to Delete ?")) {
            $scope.listEmployees.splice(index,1);
        }
    }
    $scope.selectEdit= function(index)
    {
        $scope.newEmployee= angular.copy($scope.listEmployees[index]);

    }
    $scope.add= function () {
        if($scope.newEmployee.userId==null)
        {
            $scope.listEmployees.push($scope.newEmployee)
        }else{
            alert("you can't add employee")
        }
        $scope.newEmployee={}
    }
    $scope.save= function(){

        if($scope.newEmployee.userId==null)
        {
            alert("you need EDIT before")
        }
        else{
            for(var i =0; i<$scope.listEmployees.length;i++){
                if($scope.newEmployee.userId==$scope.listEmployees[i].userId)
                {

                    $scope.listEmployees[i]=angular.copy($scope.newEmployee);

                }
            }
        }
        $scope.newEmployee={}



    }

    $scope.sortBy= function(propertyName)
    {
        if($scope.propertyName=== propertyName)
        {
            $scope.reverse=!$scope.reverse;
        }
        else
        {
            $scope.reverse=false;
        }
        $scope.propertyName= propertyName;
    }

    $scope.moreDetails= function (userId) {

        for(var i=0; i<$scope.listEmployees.length;i++)
        {
            if($scope.listEmployees[i].userId==userId)
            {
                $scope.clickFlag=true;
                $scope.employeeClick=$scope.listEmployees[i];
            }
        }



    }

});
