"use client"

import {editProfileUserSchema, EditUserProfile, SignupUser,} from "@/shared/auth.validation";
import {redirect, useRouter} from "next/navigation";
import {Gender, Role, UserType} from "@/generated/prisma/enums";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {editUserProfile} from "@/app/actions/auth.action";
import {User} from "@/generated/prisma/client";
import {formattedDate} from "@/app/utils/formattedDate";

type Props = {
    user: User;
}

export default function EditProfileForm({user}: Props) {
    const router = useRouter();
    async function onSubmit(values: EditUserProfile) {
        await editUserProfile(values);
        redirect("/")
    }

    console.log("In edit-profile-form, user : ", user);

    const defaultValues: EditUserProfile = {
        email: user?.email ?? "",
        password: "",
        name: user?.name ?? "",
        dateOfBirth: formattedDate(new Date(user?.dateOfBirth)),
        phone: user?.phone ?? "",
        image: user?.image ?? "",
        role: user?.role ?? Role.User,
        userType: user?.userType ?? UserType.Customer,
        gender: user?.gender ?? Gender.Male,

    }

    const form = useForm<EditUserProfile>({
        resolver: zodResolver(editProfileUserSchema),
        mode:"onBlur",
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    Edit Profile Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col">
                        <InputWithLabel<EditUserProfile> fieldTitle="Name" type="text" nameInSchema="name" className="mb-2 dark:text-white"/>
                        <InputWithLabel<EditUserProfile> fieldTitle="Password" type="password" nameInSchema="password" className="mb-2 dark:text-white" />
                        <InputWithLabel<EditUserProfile> fieldTitle="Phone" type="text" nameInSchema="phone" className="mb-2 dark:text-white" />
                    </div>

                    <div className="flex flex-col">
                        <InputWithLabel<EditUserProfile> fieldTitle="Email" type="email" nameInSchema="email" className="mb-2 dark:text-white" readOnly/>
                        <InputWithLabel<EditUserProfile> fieldTitle="BirthDate" type="date" nameInSchema="dateOfBirth" className="mb-2 dark:text-white"/>
                        <InputWithLabel<EditUserProfile> fieldTitle="Image" type="text" nameInSchema="image" className="mb-2 dark:text-white" />

                    </div>

                </div>
                <div className="grid grid-row1-1 gap-4">
                    <SelectWithLabel<EditUserProfile> fieldTitle="Gender" nameInSchema="gender" data={[{id: "Male", value: "Male"}, {id: "female", value: "Female"}]} className="mb-2 w-full dark:text-white"/>
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