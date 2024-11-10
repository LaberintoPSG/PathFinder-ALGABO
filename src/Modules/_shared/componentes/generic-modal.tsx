import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    algorithmName: string;
    body?: string
}

export const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, algorithmName, body }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{algorithmName}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {body}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};