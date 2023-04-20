import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 220,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 5,
};

export default function ModalComponent({
    open,
    setOpen,
    title,
    setTitle,
    addData
}) {
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input
                        placeholder='Введите название'
                        className='add-input'
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                    />
                    <div className='button-container'>
                        <button
                            className='add-docs'
                            onClick={addData}
                        >
                            Добавить
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
