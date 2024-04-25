import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addAssociate, updateAssociate } from 'src/app/store/Associate/Associate.Action';
import { getAssociate } from 'src/app/store/Associate/Associate.Selectors';
import { Associates } from 'src/app/store/model/associate.model';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.scss'],
})
export class AddassociateComponent implements OnInit {
  title = 'Create Associate';
  isEdit = false;
  dialogdata: any;
  associateform!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {
        this.associateform = this._fb.group({
          id: ['0'],
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', Validators.required],
          address: ['', Validators.required],
          type: ['CUSTOMER', Validators.required],
          associategroup: ['level1', Validators.required],
          status: [true],
        });
  }
  ngOnInit(): void {

    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(getAssociate).subscribe((res) => {
      this.associateform.setValue({
        id: res.id,
        name: res.name,
        email: res.email,
        phone: res.phone,
        address: res.address,
        associategroup: res.associategroup,
        type: res.type,
        status: res.status,
      });
    });
  }

  closePopUp() {
    this.ref.close();
  }

  saveAssociate() {
    debugger;
    if (this.associateform.valid) {
      const _obj: Associates = {
        id: this.associateform.value.id as number,
        name: this.associateform.value.name as string,
        email: this.associateform.value.email as string,
        phone: this.associateform.value.phone as string,
        associategroup: this.associateform.value.associategroup as string,
        address: this.associateform.value.address as string,
        type: this.associateform.value.type as string,
        status: this.associateform.value.status as boolean,
      };
      if (_obj.id == 0) {
        this.store.dispatch(addAssociate({ inputdata: _obj }));
      } else {
        this.store.dispatch(updateAssociate({ inputdata: _obj }));
      }
      this.closePopUp();
    }
  }
}
