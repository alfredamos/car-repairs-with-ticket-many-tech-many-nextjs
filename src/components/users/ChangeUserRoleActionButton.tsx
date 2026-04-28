"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ChangeUserRole} from "@/shared/auth.validation";
import {Role} from "@/generated/prisma/enums";
import {User} from "@/generated/prisma/client";
import {useApiClient} from "@/hooks/useApiClient";
import {Method} from "@/types/method.model";
import {ResponseMessage} from "@/utils/responseMessage";

type Props = {
    user: User;
}

export function ChangeUserRoleActionButton({ user }: Props) {
    const router = useRouter();
    const {fetcher} = useApiClient()

    const completeAndUnCompleteAction = async () => {
        const changeUserRole : ChangeUserRole = {
            email: user.email,
        }
        await fetcher<ResponseMessage>("/api/auth/change-role", Method.PATCH, {...changeUserRole})
        router.push("/users");

    }

    return (
        <Button variant="success" type="button" size="sm" className="m-2" onClick={completeAndUnCompleteAction}>
                {user.role === Role.User ? "User" : "Admin"}
        </Button>
    );
}