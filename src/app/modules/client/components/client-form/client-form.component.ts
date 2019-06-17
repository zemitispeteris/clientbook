import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../shared/services/client.service';
import { START_FROM_5_MAX_9, ONLY_NUMBERS_PATTERN,  } from 'src/app/constants/patterns.constants';
import { LanguageValidator } from 'src/app/core/validators/language.validator';
import { CHECKBOX_REQUIRED_VALIDATOR } from '@angular/forms/src/directives/validators';
import {  Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit {

  @Input() selectedClient;
  @Input() edited;
  @Output() isModalAddFormEmit = new EventEmitter();
  isPhysicalChecked = false;
  public obj: any = {};
  ClientForm: FormGroup;
  userInfoLanguageDependedFields = ['firstName'];
 
  
 
  constructor(private fb: FormBuilder, private clientService: ClientService) {
    function conditionalRequired() {

    }
  }

  ngOnInit() {
    this.ClientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), LanguageValidator]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), LanguageValidator]],
      gender: ['', [Validators.required]],
      personalId: ['', [Validators.required,  Validators.minLength(11), Validators.maxLength(11), Validators.pattern(ONLY_NUMBERS_PATTERN)]],
      mobile: ['', [Validators.required, Validators.pattern(START_FROM_5_MAX_9)]],
      image: ['', ],
      legalAddress: this.fb.group({
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
      }),
      
        physicalAddress: this.fb.group({
          country: ['', ],
          city: ['', ],
          street: ['', ]
        }),
        accounts: this.fb.array([
        ])
  
  
    });

   
  


    if (this.edited && this.selectedClient) {
      this.f.firstName.setValue(this.selectedClient.firstName);
      this.f.lastName.setValue(this.selectedClient.lastName);
      this.f.gender.setValue(this.selectedClient.gender);
      this.f.personalId.setValue(this.selectedClient.personalId);
      this.f.mobile.setValue(this.selectedClient.mobile);
      this.f.image.setValue(this.selectedClient.image);
      this.f.legalAddress.setValue(this.selectedClient.legalAddress);
      this.f.physicalAddress.setValue(this.selectedClient.physicalAddress);
    }
    return this.ClientForm;

  }

  get f() {
    return this.ClientForm.controls;
  }



  catchPhysicalBox(isPhysical) {
  //  this.ClientForm.controls.physicalAddress.get('country').setValidators([Validators.required]);

   
    this.isPhysicalChecked = isPhysical.target.checked;
  
    this.ClientForm.controls.physicalAddress.get('country').setValidators([Validators.required]);
    this.ClientForm.controls.physicalAddress.get('city').setValidators([Validators.required]);
    this.ClientForm.controls.physicalAddress.get('street').setValidators([Validators.required]);



  }

  addClient() {
    this.obj = {...this.ClientForm.value, ...this.obj};
    this.clientService.addClient(this.obj).subscribe();
    setTimeout(() => {
      this.isModalAddFormEmit.emit(false);
    }, 1000);
  }

  editClient() {

    this.clientService.updateClient(this.ClientForm.value, this.selectedClient.id).subscribe();
    setTimeout(() => {
      this.isModalAddFormEmit.emit(false);
    }, 1000);

  }

  getImageData(imgData) {
    this.obj.image = imgData;
  }

  closeAddForm() {
    this.isModalAddFormEmit.emit(false);
  }


}
