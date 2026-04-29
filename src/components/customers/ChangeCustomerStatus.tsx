"use client"

import {useRouter} from "next/navigation";
import {useApiClient} from "@/hooks/useApiClient";
import {Method} from "@/types/method.model";
import {Button} from "@/components/ui/button";
import {CustomerResponse} from "@/types/customerResp.model";

type Props = {
    active: boolean;
    customerId: string;
}

export function ChangeCustomerStatusButton({active, customerId}: Props) {
    const router = useRouter();
    const {fetcher} = useApiClient()

    const changeCustomerStatusAction = async () => {
        await fetcher<CustomerResponse>(`/api/customers/change-status/${customerId}`, Method.PATCH)
        router.refresh();

    }

    return (
        <Button variant="success" type="button" size="sm" className="m-2" onClick={changeCustomerStatusAction}>
            {active ?  "Deactivate": "Activate"}
        </Button>
    );
}