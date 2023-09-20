import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

export interface PopupModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  onClose: (confirmation: boolean) => void;
}

const PopupModal = (props: PopupModalProps) => {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    props.open === true ? setOpen(true) : setOpen(false);
  }, [props.open]);

  const handleClose = () => {debugger
    setOpen(false);
    props.onClose(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="modal-confirmation">{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
};

export default PopupModal;
