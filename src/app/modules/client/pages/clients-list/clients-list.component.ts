import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../shared/services/client.service';
import {Client} from '../../../../shared/models/client.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras, ParamMap, ActivatedRoute, Params } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { skip, switchMap, zip, map } from 'rxjs/operators';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
})
export class ClientsListComponent implements OnInit {
  isAddModal: boolean;
  isAccountModal: boolean;
  selectedClient;
  isEdited: boolean;
  makeDeleteConfirm: boolean;
  statusModal: boolean;
  clients = [];
  pageNum = 1;
  userName = '';
  count = 0;
  category;
  key;


  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  //  this.getClients(); 
    this.onUpdatePage(this.route.queryParams['_value']._page);
    this.route.data.subscribe(data => this.clients = data.data);

  }

  makeTrueAddForm() {
    this.isAddModal = true;
    this.isEdited = false;
  }

  modalAction($event) {
    this.isAddModal = $event;
    this.isAccountModal = $event;
    this.getClients();
  }


  getClients() {
  
    this.clientService.getClients(this.pageNum)
      .subscribe(clients => this.clients = clients);
  }

  deleteClient(client) {
    this.makeDeleteConfirm = true;
    this.selectedClient = client;

  }

  edit(client) {
    this.selectedClient = client;
    this.isEdited = true;
    this.isAddModal = true;
  }

  addAccount(client) {
    this.isAccountModal = true;
    this.selectedClient = client;
  }

  searchClient(keyWord: string) {
   
    for (let i = 1; i <= this.clients.length; i++) {
      for(var key in this.clients[i]){
        if(this.clients[i].hasOwnProperty(key) && this.clients[i][key] == keyWord){
           this.key = key
        }
      }
    }
       
    if (keyWord === '') {
      this.getClients();
    }
    else {
      this.clientService.searchClient(this.key, keyWord)
      .subscribe(client => this.clients = client);
    }

 
  }

  dltClient(event) {
    if (event === 'confirmed') {
      this.clients = this.clients.filter(c => c !== this.selectedClient);
      this.clientService.deleteClient(this.selectedClient.id).subscribe(resp => {   
       if ( resp.status === 200 ) {
        this.statusModal = true;
         setTimeout ( () => {
          this.statusModal = false;
         }, 1200)
       }
                   
      }) 
    }
    
    this.makeDeleteConfirm = event;
      
  }

  


  onUpdatePage(number: number) {
    this.clientService.getClients(number).subscribe
    (clients => this.clients = clients)
  }

  nextPage() { 
  
    this.pageNum = this.pageNum + 1;
    this.router.navigate(['/clients/'], {
      queryParams: {
        '_page': this.pageNum,
      }
    });  
    this.clientService.getClients(this.pageNum).subscribe
    (clients => this.clients = clients)
  }

  previousPage() {
    this.pageNum = this.pageNum - 1;
    this.router.navigate(['/clients/'], {
      queryParams: {
        '_page': this.pageNum,
      }
    });

    this.clientService.getClients(this.pageNum)
    .subscribe(clients => this.clients = clients)
  }
  

  sort(keyWord: string) {
     this.clientService.sortBy(keyWord).subscribe(clients => this.clients = clients )
  }

}


