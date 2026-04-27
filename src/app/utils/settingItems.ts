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
        if ((item.href === "/assign-tickets") && (item.label === "Assign Tickets") && !isAdmin) {

            return {
                href: `/assign-tickets/by-user-id/${id}`,
                label: item.label,

            } ;
        }
        return item;
    }) as NavLinkType[];
}
