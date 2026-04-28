"use client"

import {useRouter} from "next/navigation";
import {DeleteActionButton} from "@/app/utils/DeleteActionButton";
import {useApiClient} from "@/hooks/useApiClient";
import {UserDto} from "@/types/userDto.model";
import {Method} from "@/types/method.model";

type Props = {
    path: string;
    name: string;
}

export function DeleteUserButton({ name, path }: Props) {
    const router = useRouter();
    const {fetcher} = useApiClient();

    const onCancel = () => {
        router.push("/users");
    }

    const onSubmit = async () => {
        await fetcher<UserDto>(path, Method.DELETE);
        router.push("/users");
    }

    return (
        <DeleteActionButton onCancelAction={onCancel} onSubmitAction={onSubmit} message={`Do you really want to delete this user : ${name}?`}/>
    );
}