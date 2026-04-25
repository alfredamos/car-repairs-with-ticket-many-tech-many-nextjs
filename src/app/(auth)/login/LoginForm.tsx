"use client"

import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {LoginUser, loginUserSchema} from "@/shared/auth.validation";
import {loginUser} from "@/app/actions/auth.action";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import {useAuthContext} from "@/hooks/useAuthContext";
import {useLocalStore} from "@/hooks/useLocalStore";
import {Separator} from "@/components/ui/separator";
import {UserSession} from "@/types/UserSession.model";
import {LocalStorageParam} from "@/app/utils/localStorageParam";
import {HttpError} from "http-errors";

export default function LoginForm(){
    const {setAuthSession} = useAuthContext();
    const {setLocalStore} = useLocalStore<UserSession>()

    async function onSubmit(values: LoginUser) {
        const response = await loginUser(values);

        if (response instanceof HttpError) {
            throw response;
        }

        //----> Set auth context.
        setAuthSession(response);

        //----> Set local-storage.
        setLocalStore(LocalStorageParam.authKey, response);


        redirect("/")
    }

    const defaultValues: LoginUser = {
        email: "",
        password: "",
    }

    const form = useForm<LoginUser>({
        resolver: zodResolver(loginUserSchema),
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-xl py-6 px-10 mt-2">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    Login Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <InputWithLabel<LoginUser> fieldTitle="Email" type="email" nameInSchema="email" className={`mb-2}`}/>
                <InputWithLabel<LoginUser> fieldTitle="Password" type="password" nameInSchema="password" className="mb-2 dark:text-white" />
                <Separator className="mt-4"/>
                <div className="flex items-center justify-between gap-2 mt-4">
                    <Button type="submit" size="lg" className="flex-1 mb-4" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="flex-1 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>
            </form>
        </Form>
    )
}