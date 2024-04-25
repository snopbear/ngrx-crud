// step 2

import { createAction, props } from '@ngrx/store';
import { Associates } from '../model/associate.model';

//#region Load
export const LOAD_ASSOCIATE = '[associate page]load associate';
export const LOAD_ASSOCIATE_Success = '[associate page]load associate success';
export const LOAD_ASSOCIATE_FAIL = '[associate page]load associate fail';
export const loadAssociate = createAction(LOAD_ASSOCIATE);
export const loadAssociateSuccess = createAction(
  LOAD_ASSOCIATE_Success,
  props<{ list: Associates[] }>()
);
export const loadAssociateFail = createAction(
  LOAD_ASSOCIATE_FAIL,
  props<{ errorMessage: string }>()
);

//#endregion

//#region Get
export const GET_ASSOCIATE = '[associate page]get associate';
export const GET_ASSOCIATE_SUCCESS = '[associate page]get associate success';

export const getAssociate = createAction(
  GET_ASSOCIATE,
  props<{ id: number }>()
);
export const getAssociateSuccess = createAction(
  GET_ASSOCIATE_SUCCESS,
  props<{ obj: Associates }>()
);
//#endregion Get

//#region add
export const ADD_ASSOCIATE = '[associate page]add associate';
export const ADD_ASSOCIATE_SUCCESS = '[associate page]add associate success';
export const addAssociate = createAction(
  ADD_ASSOCIATE,
  props<{ inputdata: Associates }>()
);
export const addAssociateSuccess = createAction(
  ADD_ASSOCIATE_SUCCESS,
  props<{ inputdata: Associates }>()
);
//#endregion add

//#region update

export const UPDATE_ASSOCIATE = '[associate page]update associate';
export const UPDATE_ASSOCIATE_SUCCESS =
  '[associate page]update associate success';
export const updateAssociate = createAction(
  UPDATE_ASSOCIATE,
  props<{ inputdata: Associates }>()
);
export const updateAssociateSuccess = createAction(
  UPDATE_ASSOCIATE_SUCCESS,
  props<{ inputdata: Associates }>()
);
//#endregion update

//#region delete
export const DELETE_ASSOCIATE = '[associate page]delete associate';
export const DELETE_ASSOCIATE_SUCCESS =
  '[associate page]delete associate success';

export const deleteeAssociate = createAction(
  DELETE_ASSOCIATE,
  props<{ code: number }>()
);
export const deleteAssociateSuccess = createAction(
  DELETE_ASSOCIATE_SUCCESS,
  props<{ code: number }>()
);

//#endregion delete

//#region popup
export const OPEN_POPUP = '[associate page]open popup';

export const openpopup = createAction(OPEN_POPUP);
//#endregion popup
