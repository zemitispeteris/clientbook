import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {ClientService} from '../../shared/services/client.service';
import { Account} from "../../../../shared/models/account.model";
import {assertNumber} from "@angular/core/src/render3/assert";
import { pipe } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
})
export class AccountFormComponent implements OnInit {
  @Input() selectedClient;
  @Output() isModalAccountFormEmit = new EventEmitter();
  accounts: any = [];
  accountForm;
  constructor(private fb: FormBuilder, private  clientService: ClientService) { }

  ngOnInit() {

    this.accountForm = new FormArray([   
      new FormGroup({       
        account:new FormGroup({
          accountNum:new FormControl(), 
          accountType:new FormControl(), 
          currency:new FormControl(),
          status:new FormControl()
        })
      })
    ])   

    this.getAccounts();
    
  }


  addAccount() {

    console.log(this.selectedClient['accounts'].length)

    this.selectedClient.accounts.push(this.accountForm.value);
    
   
    for (let index = 0; index < this.selectedClient['accounts'].length; index++) {
     this.accounts.push(this.selectedClient['accounts'][index])
    }

     setTimeout(() => {
      this.clientService.updateClient(this.selectedClient, this.selectedClient.id).subscribe()
  
   
    this.isModalAccountFormEmit.emit(false);
     }, 1000);

     
  }

  getAccounts() {
    
    
    // this.clientService.getSelectedClient(1)
    // .subscribe(
    //   data => {     
          
    //       }   
    //   )
    // console.log(this.accounts)
  }


  closeAddForm() {
    
    this.isModalAccountFormEmit.emit(false);
  
  }

}
