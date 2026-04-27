import {Method} from "@/types/method.model";
import {$fetch} from "ofetch";

export function useApiClient(){
    function fetcher<T>(path: string, method: Method, body?: Record<string, any>){
        return $fetch<T>(path, {
            method,
            body
        });
    }

    return {fetcher}
}