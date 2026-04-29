"use client"

import {useRouter} from "next/navigation";
import {DeleteActionButton} from "@/app/utils/DeleteActionButton";
import {useApiClient} from "@/hooks/useApiClient";
import {UserDto} from "@/types/userDto.model";
import {Method} from "@/types/method.model";

type Props = {
    path: string;
    name: string;
    backToList: string
}

export function DeleteResourceButton<T>({ name, path, backToList }: Props) {
    const router = useRouter();
    const {fetcher} = useApiClient();

    const onCancel = () => {
        router.push(backToList);
    }

    const onSubmit = async () => {
        await fetcher<T>(path, Method.DELETE);
        router.push(backToList);
    }

    return (
        <DeleteActionButton onCancelAction={onCancel} onSubmitAction={onSubmit} message={`Do you really want to delete this resource : ${name}?`}/>
    );
}