import {Store, Action} from 'redux';

import {GlobalState} from 'mattermost-redux/types/store';

import manifest from './manifest';

// eslint-disable-next-line import/no-unresolved
import {PluginRegistry} from './types/mattermost-webapp';

import { ActionTypes, OpenTextInputModalAction } from 'action_types';
import reducers from 'reducer';

import TextCaptureModal from 'components/modals/text-capture-modal';

export default class Plugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/

        registry.registerReducer(reducers);
        registry.registerRootComponent(TextCaptureModal);

        registry.registerFileUploadMethod(
            <i className='icon fa fa-paint-brush'/>,
            (uploadFiles: (files: File[]) => void) => {
                const action: OpenTextInputModalAction = {
                    type: ActionTypes.OPEN_TEXT_INPUT_MODAL,
                    data: {
                        uploadFiles,
                    },
                };
                store.dispatch(action);
            },
            'Upload from text',
        );
    }
}

declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void
    }
}

window.registerPlugin(manifest.id, new Plugin());
