import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <button onClick={onClose} className="mb-4">Close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;