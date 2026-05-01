import Link from "next/link";

export function AdminDropdown() {
    return (
       <>
           <div className="relative group">
               {/*Dropdown Trigger (e.g., a button or link)*/}
               <button
                   className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
               >
                   Admin
               </button>

               {/*export const adminItems = [*/}
               {/*  { href: '/customers', label: 'Customers' },*/}
               {/*  { href: '/customers/all-active/get-all-active-customers', label: 'Active Customers' },*/}
               {/*  { href: '/customers/all-in-active/get-all-in-active-customers', label: 'Inactive Customers' },*/}
               {/*  { href: '/users', label: 'Users' },*/}
               {/*  { href: '/tickets/completed-tickets', label: 'CompletedTickets' },*/}
               {/*  { href: '/tickets/uncompleted-tickets', label: 'InCompletedTickets' },*/}
               {/*  { href: '/tickets/by-customer', label: 'TicketsByCustomer' },*/}
               {/*  { href: '/tickets', label: 'Tickets' },*/}
               {/*];*/}

               {/*Dropdown Menu (hidden by default)*/}

                   <div
                       className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-b border-t-0 z-10"
                   >
                       <Link
                           href="/customers"
                           className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                       >Customers</Link
                       >
                       <Link
                           href="/customers/all/active"
                           className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                       >Active Customers</Link
                       >
                       <Link
                       href="/customers/all/inactive"
                       className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                       >Inactive Customers</Link>
                   <Link
                        href="/technicians"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >Technicians</Link>
                   <Link
                       href="/assign-tickets"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                   >Assign Tickets</Link>
                <Link
                    href="/assign-tickets/all/completed"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >Completed Tickets</Link
                >
                <Link
                    href="/assign-tickets/all/incompleted"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >Uncompleted Tickets</Link
                >
                <Link
                    href="/tickets"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >Tickets</Link
                    >
                <Link
                    href="/users"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >Users</Link
                >
                </div>
            </div>
       </>
    )
}