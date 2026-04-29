import {formattedDate} from "@/app/utils/formattedDate";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import {TechnicianResponse} from "@/types/technicianResp.model";

type Props = {
    tech: TechnicianResponse;
}

export function TechCard({ tech }: Props){
    return (
        <div className="flex flex-col max-w-xs sm:max-w-sm md:max-w-md mx-auto my-auto mt-10 ring-2 ring-gray-300 dark:text-gray-400 dark:ring-gray-600 p-2 rounded-t-md mb-10 shadow-xl">
            <div className="relative w-full h-100">
                <Image
                    src={tech.image}
                    alt={tech.name}
                    fill
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <Separator className="text-gray-600"/>
            <div className="flex-1">
                <div>
                    <p className="text-sm font-bold mt-2 mb-2 flex items-center justify-between">
                        <span>Name</span>
                        <span className="text-start">{tech.name}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Email</span>
                        <span className="text-start">{tech.email}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Phone</span>
                        <span className="text-start">{tech.phone}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Specialty</span>
                        <span className="text-start">{tech.specialty}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Gender</span>
                        <span className="text-start">{tech.gender}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>BirthDate</span>
                        <span className="text-start">{formattedDate(new Date(tech.dateOfBirth))}</span>
                    </p>
                </div>
                <Separator/>
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between h-full mb-5 mt-5">
                    <Button variant="indigo" size="lg" className="w-full md:flex-1" asChild>
                        <Link href="/technicians">Back</Link>
                    </Button>
                    <Button variant="back" size="lg" className="w-full md:flex-1" asChild>
                        <Link href={`/technicians/${tech.id}/edit`}>Edit</Link>
                    </Button>
                </div>

            </div>
        </div>
    );
}