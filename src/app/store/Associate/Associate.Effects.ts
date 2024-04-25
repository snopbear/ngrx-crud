import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { AssociateService } from "src/app/service/associate.service";
import { addAssociate, addAssociateSuccess, deleteAssociateSuccess, deleteeAssociate, getAssociate, getAssociateSuccess, loadAssociate, loadAssociateFail, loadAssociateSuccess, updateAssociate, updateAssociateSuccess } from "./Associate.Action";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";

// step 3 handling the http requests


@Injectable()
export class AssociateEffects {
  constructor(private action$: Actions, private service: AssociateService) {}
  _loadassociate = createEffect(() =>
    this.action$.pipe(
      ofType(loadAssociate),
      exhaustMap((action) => {
        return this.service.GetAll().pipe(
          map((data) => {
            return loadAssociateSuccess({ list: data });
          }),
          catchError((_error) =>
            of(loadAssociateFail({ errorMessage: _error.message }))
          )
        );
      })
    )
  );

  _addassociate = createEffect(() =>
    this.action$.pipe(
      ofType(addAssociate),
      concatMap((action) => {
        return this.service.Create(action.inputdata).pipe(
          concatMap((data) => {
            return of(
              addAssociateSuccess({ inputdata: action.inputdata }),
              showalert({
                message: 'Created successfully',
                resulttype: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Faild to create associate',
                resulttype: 'faild',
              })
            )
          )
        );
      })
    )
  );
  _getassociate = createEffect(() =>
    this.action$.pipe(
      ofType(getAssociate),
      exhaustMap((action) => {
        return this.service.GetByCode(action.id).pipe(
          map((data) => {
            return getAssociateSuccess({ obj: data });
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to fetch data :' + _error.message,
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateassociate = createEffect(() =>
    this.action$.pipe(
      ofType(updateAssociate),
      concatMap((action) => {
        return this.service.Update(action.inputdata).pipe(
          concatMap((data) => {
            return of(
              updateAssociateSuccess({ inputdata: action.inputdata }),
              showalert({
                message: 'Upadted successfully.',
                resulttype: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to update associate',
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteassociate = createEffect(() =>
    this.action$.pipe(
      ofType(deleteeAssociate),
      mergeMap((action) => {
        debugger;
        return this.service.Delete(action.code).pipe(
          mergeMap((data) => {
            return of(
              deleteAssociateSuccess({ code: action.code }),
              showalert({
                message: 'Deleted successfully.',
                resulttype: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to delete associate',
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );
}