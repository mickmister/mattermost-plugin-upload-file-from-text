import { TextInputModalProps } from 'types/types';

const prefix = 'PLUGIN_UPLOAD_FILE_AS_TEXT_';

export const ActionTypes = {
    OPEN_TEXT_INPUT_MODAL: prefix + 'OPEN_TEXT_INPUT_MODAL',
    CLOSE_TEXT_INPUT_MODAL: prefix + 'CLOSE_TEXT_INPUT_MODAL',
};

export type OpenTextInputModalAction = {
    type: string;
    data: TextInputModalProps;
}
