import { FC } from 'react'

// Material UI
import { Dialog } from '@mui/material/';

interface Props {
  open: boolean;
  closeModal: () => void;
  children: React.ReactNode;


}

export const Modal: FC<Props> = ({ open, closeModal, children }) => {
  return (
    <>
      <Dialog open={open} onClose={closeModal}>
        {children}


      </Dialog>
    </>
  )
}

