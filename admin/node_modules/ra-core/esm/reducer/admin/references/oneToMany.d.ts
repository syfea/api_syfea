/// <reference types="react" />
import { Reducer } from 'redux';
import { Identifier, ReduxState } from '../../../types';
interface State {
    [relatedTo: string]: {
        ids: Identifier[];
        total: number;
    };
}
declare const oneToManyReducer: Reducer<State>;
export declare const getIds: (state: ReduxState, relatedTo: any) => import("react").ReactText[];
export declare const getTotal: (state: ReduxState, relatedTo: any) => number;
export declare const getReferences: (state: ReduxState, reference: any, relatedTo: any) => any;
export declare const getReferencesByIds: (state: ReduxState, reference: string, ids: import("react").ReactText[]) => any;
export declare const nameRelatedTo: (reference: any, id: any, resource: any, target: any, filter?: {}) => string;
export default oneToManyReducer;
