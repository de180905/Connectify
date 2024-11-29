import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility.

const ConfirmModal = ({
    isProcessing,
    isOpen,
    onRequestClose,
    onOk,
    onCancel,
    title = "Confirm Action",
    content = "Are you sure you want to proceed?"
}) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={title}
        style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                width: '30vw',
                textAlign: 'center',
                borderRadius: '8px',
            },
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 101
            },
        }}
    >
        <h2>{title}</h2>
        <p>{content}</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button onClick={onCancel} style={buttonStyle('red')}>Cancel</button>
            <button disabled={isProcessing} onClick={onOk} style={buttonStyle('green')}>OK</button>
        </div>
    </Modal>
);

const buttonStyle = (color) => ({
    backgroundColor: color,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
});

export default ConfirmModal;
