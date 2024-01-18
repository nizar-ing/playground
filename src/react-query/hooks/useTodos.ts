import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}
const useTodos = () => {
    const fetchTodos = () => axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data);

    return useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        staleTime: 10 * 1000 // setting up the stale time per query
    });
};

export default useTodos;