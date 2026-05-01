import {AssignedTicketResponse} from "@/types/assignedTicketResponse.model";
import {Separator} from "@/components/ui/separator";
import {formattedDate} from "@/app/utils/formattedDate";
import Link from "next/link";
import {Button} from "@/components/ui/button";

type Props = {
    isAdmin: boolean;
    ticket: AssignedTicketResponse;
}

export function AssignedTicketCard({isAdmin, ticket}: Props) {
    return (
            <div
                className="flex flex-col max-w-sm mx-auto my-auto mt-10 ring-2 ring-gray-300 dark:text-gray-400 dark:ring-gray-600 p-2 rounded-t-md mb-10 shadow-xl"
            >
                <div className="flex items-center justify-between">
                    <div className="flex-col items-center">
                        <p className="text-sm text-start font-bold">Customer</p>
                        <div className="flex flex-col items-center md:flex-row md:justify-between m-1 gap-2">
                            <img src={ticket?.customerImage} alt={ticket?.customerName} className="rounded-full h-15 w-15" />
                            <p className="text-sm">{ticket?.customerName }</p>
                        </div>
                    </div>
                    <div className="flex-col items-center">
                        <p className="text-sm text-start font-bold">Technician</p>
                        <div className="flex flex-col items-center md:flex-row md:justify-between m-1 gap-2">
                            <img src={ticket?.techImage} alt={ticket?.techName} className="rounded-full h-15 w-15" />
                            <p className="text-sm">{ticket?.techName }</p>
                        </div>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="w-full">
                    <div>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Title:</span>
                            <span className="text-start">{ticket?.ticketTitle }</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Completed:</span>
                            <span className="text-start">{ticket?.completed ? 'Yes' : 'No' }</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Status:</span>
                            <span className="text-start">{ticket?.status}</span>
                        </p>
                        <p className="flex flex-col mt-2 mb-2">
                            <span className="text-sm font-semibold">Notes</span>
                            <span className="break-words">{ticket?.ticketNotes }</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Customer Email</span>
                            <span className="text-start">{ticket?.customerEmail}</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Customer Phone</span>
                            <span className="text-start">{ticket?.customerPhone}</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Customer Address</span>
                            <span className="text-start">{ticket?.customerAddress}</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Tech Email</span>
                            <span className="text-start">{ticket?.techEmail}</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Tech Phone</span>
                            <span className="text-start">{ticket?.techPhone}</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Tech Speciality</span>
                            <span className="text-start">{ticket?.techSpecialty}</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Assigned By</span>
                            <span className="text-start">{ticket?.assignBy}</span>
                        </p>
                        <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                            <span className="font-semibold">Assigned At</span>
                            <span className="text-start">{formattedDate(new Date(ticket?.assignAt))}</span>
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between h-full mb-5 mt-5">
                        <Button variant="indigo" size="lg" className="w-full md:flex-1" asChild>
                            <Link href={`${isAdmin ? "/assign-tickets" : `/assign-tickets/by-tech-id/${ticket.techId}`}`}>Back</Link>
                        </Button>
                        <Button variant="back" size="lg" className="w-full md:flex-1" asChild>
                            <Link href={`/assign-tickets/${ticket.techId}/${ticket.ticketId}/edit`}>Edit</Link>
                        </Button>
                    </div>
            </div>
        </div>
    )
}