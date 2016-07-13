(function() {
    angular.module('ngtodos')
        .factory('TodoService', TodoService);
    TodoService.$inject = ['$http'];

    function TodoService($http) {
        var baseURL = 'https://quiet-refuge-27140.herokuapp.com/';
    	var o = {
    		create: createTodo,
    		readAll: getAll,
    		update: updateTodo,
    		delete: deleteTodo,
    		todos: []
    	};
    	return o;

    	function createTodo(desc){
            var info = {
                description: desc
            };
            return $http.post(baseURL + 'todos', info).then(function(response){
                getAll();
            });
        }
    	function getAll(){
    		return $http.get(baseURL + 'todos')
    			.then(function(response){
    				o.todos = response.data;
    			});
    	}
    	function updateTodo(id, newTodo){
            return $http.put(baseURL + 'todos', newTodo)
                            .then(function(response) {
                                getAll();
                            });
        }
    	function deleteTodo(id){
            return $http.delete(baseURL + 'todos/' + id).then(function(response) {
                getAll();
            });
        }
    }
})();
