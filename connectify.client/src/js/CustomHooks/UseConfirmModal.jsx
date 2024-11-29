import { useState } from 'react';
import ConfirmModal from '../Components/utils/ConfirmModel';

const useConfirmModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const ModalComponent = ({ onOk, onCancel, title, content, isProcessing }) => (
        <ConfirmModal
            isProcessing={isProcessing}
            isOpen={isOpen}
            onRequestClose={closeModal}
            onOk={async () => {
                setIsProcessing(true);
                const res = await onOk();
                setIsProcessing(false);
                if (res) {
                    closeModal();
                }
            }}
            onCancel={() => {
                onCancel();
                closeModal();
            }}
            title={title}
            content={content}
        />
    );

    return { openModal, ModalComponent };
};

export default useConfirmModal;
