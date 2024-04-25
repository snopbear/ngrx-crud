import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssociateModel } from '../model/associate.model';


const getAssociateState = createFeatureSelector<AssociateModel>('associate');

export const getAssociateList = createSelector(getAssociateState, (state) => {
  return state.list;
});

export const getAssociate = createSelector(getAssociateState, (state) => {
  return state.associateObj;
});
