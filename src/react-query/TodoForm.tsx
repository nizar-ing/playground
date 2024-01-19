import {useRef} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "./hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
    const queryClient = useQueryClient();
    const addTodo = useMutation<Todo, Error, Todo>({
        mutationFn: (todo: Todo) => axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
            .then((res) => res.data),

        onSuccess: (savedTodo, newTodo) => {
            //console.log(savedTodo);
            // Approach 1: Invalidating the cache
            /*queryClient.invalidateQueries({
                queryKey: ['todos']
            } );*/

            // Approach 2: Updating the data in the cache directly.
            queryClient.setQueryData<Todo[]>(['todos'], (todos) => [savedTodo, ...(todos || [])]);
            if(ref.current) ref.current.value = '';
        }
    });
    const ref = useRef<HTMLInputElement>(null);

    return (
        <>
            { addTodo.error &&
                <div className="alert alert-danger">
                    { addTodo.error.message }
                </div>
            }
            <form className="row mb-3" onSubmit={(event) => {
                event.preventDefault();
                if (ref.current && ref.current.value) {
                    addTodo.mutate({
                        id: 0,
                        title: ref.current.value,
                        completed: false,
                        userId: 1
                    });
                }
            }}>
                <div className="col">
                    <input ref={ref} type="text" className="form-control"/>
                </div>
                <div className="col">
                    <button className="btn btn-primary" disabled={addTodo.isLoading}>
                        {
                            addTodo.isLoading ? 'Is loading ...' : 'Add'
                        }
                    </button>
                </div>
            </form>
        </>
    );
};

export default TodoForm;
