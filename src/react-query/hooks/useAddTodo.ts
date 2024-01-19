import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constants";
import todoService, {Todo} from "../services/todoService";

interface AddTodoContext {
    previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: todoService.post,
        onMutate: (newTodo: Todo) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [newTodo, ...todos]);
            //if (ref.current) ref.current.value = '';
            onAdd();
            return {previousTodos};
        },

        onSuccess: (savedTodo, newTodo) => {
            //console.log(savedTodo);
            // Approach 1: Invalidating the cache
            /*queryClient.invalidateQueries({
                queryKey: ['todos']
            } );*/

            // Approach 2: Updating the data in the cache directly.

            queryClient.setQueryData<Todo[]>(
                CACHE_KEY_TODOS,
                (todos) => todos?.map((todo) => todo === newTodo ? savedTodo : todo)
            );

        },

        onError: (error, newTodo, context) => {
            if (!context) return;
            queryClient.setQueryData(['todos'], context.previousTodos);
        }
    });
};

export default useAddTodo;