"use client"


import {AlertDeleteDialog} from "@/app/utils/AlertDeleteDialog";

type Props = {
    message: string;
    onCancelAction: () => void;
    onSubmitAction: () => void;
}

export function DeleteActionButton({message, onCancelAction, onSubmitAction}: Props) {
    return (
        <AlertDeleteDialog
            dialogName="Delete"
            dialogTitle="Are you sure?"
            dialogMessage={message}
            onSubmit={onSubmitAction}
            onCancel={onCancelAction}
        />
    );
}