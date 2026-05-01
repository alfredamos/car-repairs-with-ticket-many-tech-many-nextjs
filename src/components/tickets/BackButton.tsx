import Link from "next/link";
import {Button} from "@/components/ui/button";

type Props = {
    isAdmin: boolean;
}

export function BackButton({isAdmin}: Props) {
    function returnUrl(isAdmin: boolean) {
        return isAdmin ? "/tickets" : "/";
    }

    return (
        <Button variant="indigo" size="lg" className="w-full md:flex-1" asChild>
            <Link href={returnUrl(isAdmin)}>Back</Link>
        </Button>
    );
}