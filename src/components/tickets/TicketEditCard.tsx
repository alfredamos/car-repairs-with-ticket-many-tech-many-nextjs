"use client"

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {TextAreaWithLabel} from "@/components/form-elements/TextAreaWithLabel";
import {Button} from "@/components/ui/button";
import {redirect, useRouter} from "next/navigation";
import {editTicketById} from "@/app/actions/ticket.action";
import {Separator} from "@/components/ui/separator";
import {TicketEdit, ticketEditSchema} from "@/shared/ticket.validation";

type Props = {
    defaultValues: TicketEdit;
}

export function TicketEditCard({defaultValues}: Props) {
    const router = useRouter();

    const form = useForm<TicketEdit>({
        resolver: zodResolver(ticketEditSchema),
        mode:"onBlur",
        defaultValues,
    });

    async function onSubmit(values: TicketEdit) {
        await editTicketById(values.id, values);
        redirect("/tickets")
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
                        <InputWithLabel<TicketEdit> fieldTitle="Title" type="text" nameInSchema="title" className="mb-2 dark:text-white" />
                        <TextAreaWithLabel<TicketEdit> fieldTitle="Description" nameInSchema="description" className="dark:text-white"/>
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
