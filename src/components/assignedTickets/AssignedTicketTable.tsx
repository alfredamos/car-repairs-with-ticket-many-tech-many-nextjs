import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {AssignedTicketResponse} from "@/types/assignedTicketResponse.model";
import {formattedDate} from "@/app/utils/formattedDate";
import {DeleteResourceButton} from "@/components/DeleteResourceButton";
import {CompleteActionButton} from "@/components/assignedTickets/CompleteActionButton";

type Props = {
    tickets: AssignedTicketResponse[];
}

export default function AssignedTicketTable({ tickets}: Props) {
    //----> Check for empty array of tickets.
    if (tickets?.length === 0) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">There are no tickets to display at this time!</h1></div>
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <Separator className="mb-4 mt-2"/>
            <div className="flex items-center justify-between">
                <span className="font-bold">Add New Ticket</span>
                <Button asChild size="lg" >
                    <Link href="/assign-tickets/add" className="font-bold">Add</Link>
                </Button>
            </div>
            <Separator className="mb-2 mt-4"/>
            <Table className="mt-5">
                <TableCaption>A list of Car-repair-shop assigned tickets.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>AssignBy</TableHead>
                        <TableHead>AssignAt</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Customer Email</TableHead>
                        <TableHead>Customer Address</TableHead>
                        <TableHead>Customer Phone</TableHead>
                        <TableHead>Tech Name</TableHead>
                        <TableHead>Tech Email</TableHead>
                        <TableHead>Tech Phone</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow key={`${ticket.ticketId}-${ticket.techId}`}>
                            <TableCell>{ticket.ticketTitle}</TableCell>
                            <TableCell>{ticket.ticketNotes}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                            <TableCell>{ticket.completed ? "Yes" : "Not yet"}</TableCell>
                            <TableCell>{ticket.assignBy}</TableCell>
                            <TableCell>{formattedDate(ticket.assignAt)}</TableCell>
                            <TableCell>{ticket.customerName}</TableCell>
                            <TableCell>{ticket.customerEmail}</TableCell>
                            <TableCell>{ticket.customerAddress}</TableCell>
                            <TableCell>{ticket.customerPhone}</TableCell>
                            <TableCell>{ticket.techName}</TableCell>
                            <TableCell>{ticket.techEmail}</TableCell>
                            <TableCell>{ticket.techPhone}</TableCell>
                            <TableCell>{ticket.techSpecialty}</TableCell>
                            <TableCell className="w-1/3">
                                <Button variant="indigo" type="button" size="sm" className="m-2">
                                    <Link href={`/assign-tickets/${ticket.techId}/${ticket.ticketId}/detail`}>Detail</Link>
                                </Button>

                                <Button variant="back" type="button" size="sm" className="m-2">
                                    <Link href={`/assign-tickets/${ticket.techId}/${ticket.ticketId}/edit`}>Edit</Link>
                                </Button>
                                <DeleteResourceButton name={`${ticket.ticketTitle}-assigned-to-${ticket.techName}`} path={`/api/tickets/${ticket.techId}/${ticket.ticketId}`} backToList="/assign-tickets"/>
                                <CompleteActionButton completed={ticket.completed} path={`/api/assign-tickets/change-status/${ticket.techId}/${ticket.ticketId}`}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}