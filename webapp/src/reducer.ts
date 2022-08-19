import { ActionTypes, OpenTextInputModalAction } from 'action_types';
import { combineReducers } from 'redux';
import { TextInputModalProps } from 'types/types';

const textInputModal = (state: TextInputModalProps | null = null, action: OpenTextInputModalAction) => {
    switch (action.type) {
    case ActionTypes.OPEN_TEXT_INPUT_MODAL:
        return action.data;
    case ActionTypes.CLOSE_TEXT_INPUT_MODAL:
        return null;
    default:
        return state;
    }
};

export default combineReducers({
    textInputModal,
});
