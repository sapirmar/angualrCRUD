var myapp = angular.module('myapp',[]);
//var fs= require('fs');
myapp.controller('employeesController', function ($scope,$http) {

    $scope.newEmployee={}; // for the save/add
    $scope.listEmployees=[];
    $scope.propertyName= 'firstName';   //for the sort
    $scope.reverse= true;               //for the sort
    $scope.employeeClick=null;          //for more information
    $scope.clickFlag=false;              //for more information


    /**
     * get the data from the json file
     */
    $http.get('employees.json').
        then(function onSuccess (response) {
            $scope.listEmployees=response.data.Employees;


    }).catch(function onError(response) {
        console.log(response)
    })

    /**
     * delete function
     * @param index
     */
    $scope.del= function (index) {
        if (confirm("Are you sure to Delete ?")) {
            $scope.listEmployees.splice(index,1);
        }
    }
    /**
     * edit function
     * @param index
     */
    $scope.selectEdit= function(index)
    {
        $scope.newEmployee= angular.copy($scope.listEmployees[index]);

    }
    /**
     * add function
     */
    $scope.add= function () {
        if($scope.newEmployee.userId==null)
        {
            $scope.listEmployees.push($scope.newEmployee);
        }else{
            alert("you can't add employee")
        }
        $scope.newEmployee={}
    }
    /**
     * save function
     */
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
    /**
     * sort function by parameter
     * @param propertyName
     */
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

    /**
     * more information function
     * @param userId
     */
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


    /**
     * to save the new list on Json file.
     * test.
     */
    var saveJson = function () {
         var listToJson = {};

        listToJson['Emoloyees']=$scope.listEmployees;

        fs.writeFile("./newList.json", JSON.stringify(listToJson), (err)=>{
            if(err)
            {
                console.log(err);
                return;
            };
            console.log("File has been created");
        });





    }
});
