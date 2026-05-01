import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {TicketResponse} from "@/types/ticketResponse.model";

type Props = {
    ticket: TicketResponse;
}

export function TicketCard({ ticket}: Props) {
    return (
        <div className="flex flex-col max-w-sm mx-auto my-auto mt-10 ring-2 ring-gray-300 dark:text-gray-400 dark:ring-gray-600 p-2 rounded-t-md mb-10 shadow-xl">
            <div className="flex flex-col items-center md:flex-row md:justify-between h-20 m-1">
                <div className="relative h-20">
                    <img src={ticket.customerImage} alt={ticket.customerName} className="h-20 w-20 object-cover rounded-full" sizes="(max-width: 768px) 100vw, 50vw"/>
                </div>

                <p>{ticket.title }</p>
            </div>

            <hr className="h-px my-4 bg-gray-200 border-0"/>
            <div className="w-full">
                <div className="">
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Customer Name</span>
                        <span className="text-start">{ticket.customerName }</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Customer Email</span>
                        <span className="text-start">{ticket.customerEmail }</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Customer Phone</span>
                        <span className="text-start">{ticket.customerPhone }</span>
                    </p>
                    <div className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <p>Repair Note</p>
                        <p className="text-start">{ticket.description}</p>
                    </div>
                </div>
                <Separator className="h-px my-4 bg-gray-200 border-0"/>
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between h-full mb-5 mt-5">
                    <Button variant="indigo" size="lg" className="w-full md:flex-1" asChild>
                        <Link href="/tickets">Back</Link>
                    </Button>
                    <Button variant="back" size="lg" className="w-full md:flex-1" asChild>
                        <Link href={`/tickets/${ticket.id}/edit`}>Edit</Link>
                    </Button>
                </div>
            </div>

        </div>
    );
}