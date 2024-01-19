import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constants";
import APIClient from "../services/APIClient";

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}
const apiClient = new APIClient<Todo>('/todos');
const useTodos = () => {
    return useQuery<Todo[], Error>({
        queryKey: CACHE_KEY_TODOS,
        queryFn: apiClient.getAll,
        staleTime: 10 * 1000 // setting up the stale time per query
    });
};

export default useTodos;