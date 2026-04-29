"use client"

import {redirect, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {TechnicianCreate, TechnicianEdit, technicianEditSchema} from "@/shared/tech.validation";
import {editTechById} from "@/app/actions/tech.action";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";

type Props = {
    defaultValues: TechnicianEdit;
}


export function TechEditCard({defaultValues}: Props) {
    const router = useRouter();

    async function onSubmit(values: TechnicianEdit) {
        await editTechById(values.id, values);

        redirect("/")
    }

    const form = useForm<TechnicianEdit>({
        resolver: zodResolver(technicianEditSchema),
        mode:"onBlur",
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    Technician Edit Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <InputWithLabel<TechnicianCreate> fieldTitle="Specialty" type="text" nameInSchema="specialty" className="mb-2 dark:text-white"/>
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