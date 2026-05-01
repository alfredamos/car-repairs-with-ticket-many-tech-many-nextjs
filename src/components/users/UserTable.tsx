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
import { DeleteUserButton } from "./DeleteUserButton";
import { ChangeUserRoleActionButton } from "./ChangeUserRoleActionButton";
import {UserDto} from "@/types/userDto.model";
import {User, UserType} from "@/generated/prisma/client";

type Props = {
    users: UserDto[]
}

export default function UserTable({ users }: Props) {
    //----> Check for empty array of users.
    if (users?.length === 0) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">There are no users to display at this time!</h1></div>
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <Separator className="mb-4 mt-2"/>
            <div className="flex items-center justify-between">
                <span className="font-bold">Add New User</span>
                <Button asChild size="lg" >
                    <Link href="/signup" className="font-bold">Add</Link>
                </Button>
            </div>
            <Separator className="mb-2 mt-4"/>
            <Table className="mt-5">
                <TableCaption>A list of Car-repair-shop users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>UserType</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                <img
                                    src={user.image}
                                    height={80}
                                    width={80}
                                    alt={user.name}
                                />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>{user.userType}</TableCell>
                            <TableCell className="w-1/3">
                                <Button variant="indigo" type="button" size="sm" className="m-2">
                                    <Link href={`/users/${user.id}/detail`}>Detail</Link>
                                </Button>
                                <DeleteUserButton name={user.name} path={`/api/users/${user.id}`}/>
                                <ChangeUserRoleActionButton user={user as unknown as User}/>
                                <Button variant="back" type="button" size="sm" className="m-2">
                                    <Link href={user.userType === UserType.Technician ? `/assign-tickets/by-user-id/${user.id}` : `/tickets/by-user-id/${user.id}`}>Tickets</Link>
                                </Button>                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}