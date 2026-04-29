"use client"

import {redirect, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {TextAreaWithLabel} from "@/components/form-elements/TextAreaWithLabel";
import {Button} from "@/components/ui/button";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {UserDto} from "@/types/userDto.model";
import {UserType} from "@/generated/prisma/enums";
import {createCustomer} from "@/app/actions/customer.action";
import {TechnicianCreate, technicianCreateSchema} from "@/shared/tech.validation";
import {createTech} from "@/app/actions/tech.action";
import {ChangeUserPassword} from "@/shared/auth.validation";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";

type Props = {
    defaultValues: TechnicianCreate;
    users: UserDto[];
}


export function TechCreateCard({defaultValues, users}: Props) {
    const router = useRouter();

    async function onSubmit(values: TechnicianCreate) {
        await createTech(values);

        redirect("/")
    }

    const form = useForm<TechnicianCreate>({
        resolver: zodResolver(technicianCreateSchema),
        mode:"onBlur",
        defaultValues,
    });

    const userIdAndName = users.filter(user => user.userType === UserType.Technician).map(user => ({value: user.name, id: user.id}));

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                   Technician Create Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <InputWithLabel<TechnicianCreate> fieldTitle="Specialty" type="text" nameInSchema="specialty" className="mb-2"/>
                        <SelectWithLabel<TechnicianCreate> fieldTitle="User ID" nameInSchema="userId"
                                                         className="mb-2 dark:text-white" data={[...userIdAndName]}/>
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