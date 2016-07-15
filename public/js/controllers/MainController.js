(function() {
    angular.module('ngtodos') //getter
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'TodoService'];

    function MainController($scope, TodoService) {
        $scope.todos = TodoService.todos;
        $scope.create = createTodo;
        $scope.delete = deleteTodo;
        $scope.edit = editTodo;
        $scope.update = updateTodo;
        $scope.cancel = cancelEdit;
        getTodos();

        function cancelEdit(todo) {
            todo.editting = false;

        }

        function editTodo(todo) {
            todo.editting = true;
        }

        function updateTodo(todo) {
            console.log('UPDATE TODO PASSED =',todo);
            todo.editting = false;
            todo.isComplete = todo.isComplete.toString();
            TodoService.update(todo.id, todo)
                            .then(function(){
                                getTodos();
                            });
        }

        //returns array of all todos
        function getTodos(){
            TodoService.readAll()
                        .then(function(){
                            $scope.todos = TodoService.todos;
                            // console.log($scope.todos);
                        });
        }

        function createTodo(description){
         TodoService.create(description)
                    .then(function(){
                        $scope.description = '';
                        getTodos();
                    });
         }
         function deleteTodo(id) {
            console.log(id);
            TodoService.delete(id)
                        .then(function(){
                            getTodos();
                        });
         }   
        }
    
})();
