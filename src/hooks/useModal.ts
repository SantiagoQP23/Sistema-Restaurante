import {useState} from 'react';


export const useModal = (initialValue: boolean = false) => {
    const [isOpen, setOpen] = useState(initialValue);

    const handleClickOpen = () => {
        
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

    return {isOpen, handleClickOpen, handleClose};
}