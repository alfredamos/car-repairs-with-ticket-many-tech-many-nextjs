"use client"

import {Separator} from "@/components/ui/separator";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {redirect, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AssignedTicketCreate, assignedTicketCreateSchema} from "@/shared/assignedTicket.validation";
import {TicketResponse} from "@/types/ticketResponse.model";
import {TechnicianResponse} from "@/types/technicianResp.model";
import {createAssignedTicket} from "@/app/actions/assign-ticket.action";

type Props = {
    defaultValues: AssignedTicketCreate;
    tickets: TicketResponse[];
    techs: TechnicianResponse[];
}

export function AssignedTicketCreateCard({defaultValues, techs, tickets}: Props) {
    const router = useRouter();

    const form = useForm<AssignedTicketCreate>({
        resolver: zodResolver(assignedTicketCreateSchema),
        mode:"onBlur",
        defaultValues,
    });

    async function onSubmit(values: AssignedTicketCreate) {
        await createAssignedTicket(values);
        redirect("/assign-tickets")
    }

    const techIdAndName = techs?.map(tech => ({value: tech.name, id: tech.id}));
    const ticketIdAndTitle = tickets?.map(ticket => ({value: ticket.title, id: ticket.id}));

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    Ticket Create Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <SelectWithLabel<AssignedTicketCreate> fieldTitle="Tech ID" nameInSchema="techId" data={[...techIdAndName]} className="w-full dark:text-white mb-2"/>
                        <SelectWithLabel<AssignedTicketCreate> fieldTitle="Ticket ID" nameInSchema="ticketId" data={[...ticketIdAndTitle]} className="w-full dark:text-white mb-2"/>
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