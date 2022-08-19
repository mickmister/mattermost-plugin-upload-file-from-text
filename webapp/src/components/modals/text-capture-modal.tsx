import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getModalStyles } from 'utils/styles';

import { getTheme } from 'mattermost-redux/selectors/entities/preferences';
import { GlobalState } from 'mattermost-redux/types/store';

import { TextInputModalProps } from 'types/types';
import { ActionTypes } from 'action_types';

type Props = TextInputModalProps;

const getModalProps = (state: GlobalState): TextInputModalProps | null => state['plugins-upload-file-from-text'].textInputModal;
const closeModal = () => ({
    type: ActionTypes.CLOSE_TEXT_INPUT_MODAL,
});

export default function TextCaptureModal() {
    const modalProps = useSelector(getModalProps);
    const dispatch = useDispatch();

    if (!modalProps) {
        return null;
    }

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <Modal
            dialogClassName='modal--scroll'
            show={Boolean(modalProps)}
            onHide={handleClose}
            onExited={handleClose}
            bsSize='large'
            backdrop='static'
        >
            {modalProps && <TextCaptureForm {...modalProps} />}
        </Modal>
    );
}

export function TextCaptureForm(modalProps: Props) {
    const theme = useSelector(getTheme);

    const [submitting, setSubmitting] = useState(false);
    
    const [fileName, setFileName] = useState('data.json');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleSubmit = () => {
        const file = new File([new Blob([text])], fileName);
        modalProps.uploadFiles([file]);
        dispatch(closeModal());
    };

    const style = getModalStyles(theme);
    const disableSubmit = text.length === 0;

    const footer = (
        <React.Fragment>
            <button
                type='button'
                className='save-button btn btn-link'
                onClick={handleClose}
            >
                {'Cancel'}
            </button>
            <button
                id='submit-button'
                type='submit'
                className='save-button btn btn-primary'
                disabled={disableSubmit}
            >
                {'Create'}
            </button>
        </React.Fragment>
    );

    const form = (
        <div>
            <label>{'File name'}</label>
            <input
                className='form-control'
                onChange={e => setFileName(e.target.value)}
                value={fileName}
            />
            <div style={{height: '20px'}}/>
            <textarea
                style={{resize: 'vertical'}}
                className='form-control'
                rows={20}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );

    return (
        <>
            <Modal.Header closeButton={true}>
                <Modal.Title>{'Upload File from Text'}</Modal.Title>
            </Modal.Header>
            <form
                role='form'
                onSubmit={handleSubmit}
            >
                <Modal.Body
                    style={style.modalBody}
                >
                    {error}
                    {form}
                </Modal.Body>
                <Modal.Footer style={style.modalFooter}>
                    {footer}
                </Modal.Footer>
            </form>
        </>
    );
}
