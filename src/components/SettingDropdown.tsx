import Link from "next/link";

type Props = {
    userId: string;
    refreshUserToken: () => void;
}

export function SettingDropdown({userId, refreshUserToken}: Props) {
    return (
        <>
        <div className="relative group">
            <button
                type="button"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
                Settings
            </button>

            {/*Dropdown Menu (hidden by default)*/}
            <div
                className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-b border-t-0 z-10"
            >
                <Link
                    href="/change-password"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >Change Password</Link
                >
                <Link
                href="/edit-profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >Edit profile</Link
            >
            <Link href="/public" className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >Home</Link
            >
            <button
                type="button"
            onClick={refreshUserToken}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
            Refresh
        </button>
        <Link
        href={`/assign-tickets/by-user-id/${userId}`}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Tickets</Link
        >
        </div>
    </div>
        </>

    )
}