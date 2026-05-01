import Link from "next/link";
import {CustomerResponse} from "@/types/customerResp.model";
import {formattedDate} from "@/app/utils/formattedDate";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DeleteResourceButton} from "@/components/DeleteResourceButton";
import {ChangeCustomerStatusButton} from "@/components/customers/ChangeCustomerStatus";

type Props = {
    customers: CustomerResponse[]
}

export function CustomerTable({customers}:Props) {
    //----> Check for empty array of users.
    if (customers?.length === 0) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">There are no users to display at this time!</h1></div>
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <Separator className="mb-4 mt-2"/>
            <div className="flex items-center justify-between">
                <span className="font-bold">Add New User</span>
                <Button asChild size="lg" >
                    <Link href="/customers/add" className="font-bold">Add</Link>
                </Button>
            </div>
            <Separator className="mb-2 mt-4"/>
            <Table className="mt-5">
                <TableCaption>A list of Car-repair-shop customers.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Birthdate</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                                <img
                                    src={customer.image}
                                    height={80}
                                    width={80}
                                    alt={customer.name}
                                />
                            </TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell>{customer.gender}</TableCell>
                            <TableCell>{formattedDate(new Date(customer.dateOfBirth))}</TableCell>
                            <TableCell className="text-left">{customer.notes}</TableCell>
                            <TableCell className="w-1/3">
                                <Button variant="indigo" type="button" size="sm" className="m-2">
                                    <Link href={`/customers/${customer.id}/detail`}>Detail</Link>
                                </Button>
                                <DeleteResourceButton<CustomerResponse> name={customer.name} path={`/customers/${customer.id}/delete`} backToList="/customers"/>
                                <Button variant="edita" type="button" size="sm" className="m-2">
                                    <Link href={`/customers/${customer.id}/edit`}>Edit</Link>
                                </Button>
                                <ChangeCustomerStatusButton active={customer.active} customerId={customer.id}/>
                                <Button variant="back" type="button" size="sm" className="m-2">
                                    <Link href={`/tickets/by-customer-id/${customer.id}`}>Tickets</Link>
                                </Button>                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}