import { useRef } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const EditNameModal = ({name, onClose, onSave }) => {
    let inputRef = useRef(null);

    const handleSave = () => {
        const newName = inputRef.current.value.trim();
        if (newName) {
            onSave(newName);  // Pass the new name to the parent component
        } else {
            alert("Name cannot be empty");
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Edit Name Modal"
            style={{
                content: {
                    maxWidth: '500px',
                    margin: 'auto',
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '50vh'
                },
            }}
            overlayClassName="coverUploader-overlay"
        >
            <div className="modal-header d-flex justify-content-between align-items-center">
                <h2 className="modal-title">Edit Name</h2>
            </div>
            <div className="modal-body">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    id="name"
                    ref={inputRef}
                    type="text"
                    defaultValue={name}
                    className="form-control"
                    placeholder="Enter new name"
                />
            </div>
            <div className="modal-footer d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={onClose}>
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                    OK
                </button>
            </div>
        </Modal>
    );
};
