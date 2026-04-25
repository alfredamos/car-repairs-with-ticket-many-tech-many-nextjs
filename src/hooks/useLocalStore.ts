import * as localStore from "local-storage"

export function useLocalStore<T>(){
    function setLocalStore(key: string, resource: T){
        localStore.set<T>(key, resource);
    }

    function getLocalStore(key: string): T{
        return localStore.get<T>(key)
    }

    function removeLocalStore(key: string){
        localStore.remove(key);
    }

    return {getLocalStore, removeLocalStore, setLocalStore}
}