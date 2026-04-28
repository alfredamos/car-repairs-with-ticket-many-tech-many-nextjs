export type NavLinkType = {
    href: string;
    label: string;
}

export const settingItems = [
    { href: '/change-password', label: 'Change Password' },
    { href: '/edit-profile', label: 'Edit Profile' },
    { href: '/', label: 'Home' },
    { href: '/refresh', label: 'Refresh' },
    { href: '/assign-tickets', label: 'Assign Tickets' },
];

export function getAllSettingItems(id: string, isAdmin: boolean) {
    return settingItems.map(item => {
        console.log("In get-all-settings, href : ", item.href, " , label : ", item.label)
        if ((item.href === "/assign-tickets") && (item.label === "Assign Tickets")) {
            console.log("In get-all-settings, userId : ", id)
            return {
                href: `/assign-tickets/by-user-id/${id}`,
                label: item.label,

            } ;
        }
        return item;
    }) as NavLinkType[];
}
