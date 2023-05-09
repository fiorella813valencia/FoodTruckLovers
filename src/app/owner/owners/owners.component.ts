import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServicesService} from "../services/services.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent {
  empForm: FormGroup;

  constructor(private _fb:FormBuilder, private _ownServices:ServicesService) {
    this.empForm=this._fb.group({
      ownerFirstName:'',
      ownerLastName:'',
      brandName:'',
      email:'',
      address:'',
      websiteUrl:'',
      menuUrl:''
    })

  }


  onSubmitFunction() {
    if(this.empForm.valid){
      //console.log(this.empForm.value);
      this._ownServices.addOwner(this.empForm.value).subscribe({
        next:(val:any)=>{
          alert('Owner added successfully');
          //this._dialogRef.close();
        },
        error:(err:any)=>{
          console.error(err);
        },
      });
    }
  }
}
