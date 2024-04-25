import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/store/model/associate.model';
import {
  deleteeAssociate,
  getAssociate,
  loadAssociate,
  openpopup,
} from 'src/app/store/Associate/Associate.Action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { getAssociateList } from 'src/app/store/Associate/Associate.Selectors';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.scss'],
})
export class AssociatelistingComponent implements OnInit {
  Asociatelist!: Associates[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColums: string[] = [
    'code',
    'name',
    'email',
    'phone',
    'address',
    'type',
    'associategroup',
    'status',
    'action',
  ];

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).subscribe((item) => {
      this.Asociatelist = item;
      this.dataSource = new MatTableDataSource<Associates>(this.Asociatelist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FunctionAdd() {
    this.OpenPopUp(0, 'Create Associate');
  }

  FunctionEdit(code: number) {
    this.OpenPopUp(code, 'Update Associate');
    this.store.dispatch(getAssociate({ id: code }));
  }

  FunctionDelete(code: number) {
    if (confirm('do you want to remove?')) {
      this.store.dispatch(deleteeAssociate({ code: code }));
    }
  }
  OpenPopUp(code: number, title: string): void {
    this.store.dispatch(openpopup());

    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000,
      data: { code: code, title: title },
    });
  }
}
