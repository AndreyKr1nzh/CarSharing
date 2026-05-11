import { Modal } from 'react-bootstrap';
import DocumentsForm from './DocumentsForm';

function DocsModal({ show, onClose, onSaved }) {
    return (
        <Modal 
            show={show} 
            onHide={onClose} 
            size="lg" 
            centered 
            className="custom-modal"
            aria-labelledby="docs-modal-title"
        >
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title id="docs-modal-title" className="custom-modal-title">
                    Верификация документов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-body">
                <DocumentsForm onSaved={onSaved} onClose={onClose} />
            </Modal.Body>
        </Modal>
    );
}

export default DocsModal;