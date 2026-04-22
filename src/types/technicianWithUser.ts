import {User} from "@/generated/prisma/client";

export class TechnicianWithUser {
    id!: string;
    speciality!: string;
    userId!: string;
    user!: User
}