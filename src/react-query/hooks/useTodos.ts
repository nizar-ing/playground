import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constants";

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}
const useTodos = () => {
    const fetchTodos = () => axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data);

    return useQuery<Todo[], Error>({
        queryKey: CACHE_KEY_TODOS,
        queryFn: fetchTodos,
        staleTime: 10 * 1000 // setting up the stale time per query
    });
};

export default useTodos;