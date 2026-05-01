"use client"

import {Separator} from "@/components/ui/separator";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {redirect, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AssignedTicketEdit, assignedTicketEditSchema} from "@/shared/assignedTicket.validation";
import {editAssignedTicketById} from "@/app/actions/assign-ticket.action";

type Props = {
    defaultValues: AssignedTicketEdit;
}

export function AssignedTicketEditCard({defaultValues}: Props) {
    const router = useRouter();

    const form = useForm<AssignedTicketEdit>({
        resolver: zodResolver(assignedTicketEditSchema),
        mode:"onBlur",
        defaultValues,
    });

    async function onSubmit(values: AssignedTicketEdit) {
        await editAssignedTicketById(values.techId, values.ticketId, values);
        redirect("/assign-tickets")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    Ticket Create Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <SelectWithLabel<AssignedTicketEdit> fieldTitle="Status" nameInSchema="status" data={[{value: "Open", id: "Open"}, {value: "Closed", id: "Closed"}]} className="w-full dark:text-white mb-2"/>
                    </div>
                </div>
                <Separator className="mt-4"/>
                <div className="flex flex-col md:flex-row items-center md:justify-between mt-6 gap-2">
                    <Button type="button" size="lg" className="w-full md:w-1/3 mb-4" variant="back" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" size="lg" className="w-full md:w-1/3 mb-4" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="w-full md:w-1/3 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )
}