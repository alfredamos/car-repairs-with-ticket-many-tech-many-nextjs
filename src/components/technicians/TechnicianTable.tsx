import {TechnicianResponse} from "@/types/technicianResp.model";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import SearchUsers from "@/components/users/SearchResources";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DeleteResourceButton} from "@/components/DeleteResourceButton";
import {formattedDate} from "@/app/utils/formattedDate";


type Props = {
    techs: TechnicianResponse[]
}

export function TechnicianTable({techs}: Props) {
    //----> Check for empty array of users.
    if (techs?.length === 0) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">There are no users to display at this time!</h1></div>
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <Separator className="mb-4 mt-2"/>
            <div className="flex items-center justify-between">
                <span className="font-bold">Add New Technician</span>
                <Button asChild size="lg" >
                    <Link href="/technicians/add" className="font-bold">Add</Link>
                </Button>
            </div>
            <Separator className="mb-2 mt-4"/>
            <SearchUsers path="/technicians" />
            <Separator className="mb-2 mt-2"/>
            <Table className="mt-5">
                <TableCaption>A list of Car-repair-shop technicians.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Birthdate</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {techs.map((tech) => (
                        <TableRow key={tech.id}>
                            <TableCell className="font-medium">
                                <img
                                    src={tech.image}
                                    height={80}
                                    width={80}
                                    alt={tech.name}
                                />
                            </TableCell>
                            <TableCell>{tech.name}</TableCell>
                            <TableCell>{tech.email}</TableCell>
                            <TableCell>{tech.phone}</TableCell>
                            <TableCell>{tech.specialty}</TableCell>
                            <TableCell>{tech.gender}</TableCell>
                            <TableCell>{formattedDate(new Date(tech.dateOfBirth))}</TableCell>
                            <TableCell className="w-1/3">
                                <Button variant="indigo" type="button" size="sm" className="m-2">
                                    <Link href={`/technicians/${tech.id}/detail`}>Detail</Link>
                                </Button>
                                <DeleteResourceButton<TechnicianResponse> name={tech.name} path={`/technicians/${tech.id}/delete`} backToList="/technicians"/>
                                <Button variant="edita" type="button" size="sm" className="m-2">
                                    <Link href={`/technicians/${tech.id}/edit`}>Edit</Link>
                                </Button>
                                <Button variant="back" type="button" size="sm" className="m-2">
                                    <Link href={`/assign-tickets/by-tech-id/${tech.id}`}>Tickets</Link>
                                </Button>                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}