"use client"

import {useRouter} from "next/navigation";
import {useApiClient} from "@/hooks/useApiClient";
import {ResponseMessage} from "@/utils/responseMessage";
import {Method} from "@/types/method.model";
import {Button} from "@/components/ui/button";

type Props = {
    completed: boolean;
    path: string;
}

export function CompleteActionButton({completed, path}:Props){
    const router = useRouter();
    const {fetcher} = useApiClient()

    const changeTicketStatusAction = async () => {
        await fetcher<ResponseMessage>(path, Method.PATCH)
        router.refresh();

    }

    return (
        <Button variant="success" type="button" size="sm" className="m-2" onClick={changeTicketStatusAction}>
            {completed ? "Undo" : "Done"}
        </Button>
    );
}