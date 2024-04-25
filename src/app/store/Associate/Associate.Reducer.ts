// step 4 handling the http requests

import { createReducer, on } from "@ngrx/store";
import { AssociateState } from "./Associate.State";
import { addAssociateSuccess, deleteAssociateSuccess, getAssociateSuccess, loadAssociateFail, loadAssociateSuccess, openpopup, updateAssociateSuccess } from "./Associate.Action";


const _AssociateReducer = createReducer(
  AssociateState,
  on(loadAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: '',
    };
  }),
    on(getAssociateSuccess, (state, action) => {
      return {
        ...state,
        associateObj: action.obj,
        errorMessage: '',
      };
    }),
  on(loadAssociateFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errorMessage,
    };
  }),
    on(addAssociateSuccess, (state, action) => {
      const _maxid = Math.max(...state.list.map((o) => o.id));
      const _newdata = { ...action.inputdata };
      _newdata.id = _maxid + 1;
      return {
        ...state,
        list: [...state.list, _newdata],
        errormessage: '',
      };
    }),
    on(updateAssociateSuccess, (state, action) => {
      const _newdata = state.list.map((o) => {
        return o.id === action.inputdata.id ? action.inputdata : o;
      });
      return {
        ...state,
        list: _newdata,
        errormessage: '',
      };
    }),
    on(deleteAssociateSuccess, (state, action) => {
      const _newdata = state.list.filter((o) => o.id !== action.code);
      return {
        ...state,
        list: _newdata,
        errormessage: '',
      };
    }),
    on(openpopup, (state, action) => {
        debugger
      return {
        ...state,
        associateObj: {
          id: 0,
          name: '',
          email: '',
          phone: '',
          type: 'CUSTOMER',
          address: '',
          associategroup: 'level1',
          status: true,
        },
      };
    })
);

export function AssociateReducer(state:any, action:any) {
return _AssociateReducer(state, action);
}