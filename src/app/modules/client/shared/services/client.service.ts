import { Injectable } from '@angular/core';
import {Client} from '../../../../shared/models/client.model';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {error} from "@angular/compiler/src/util";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  accountObj;
  constructor(private http: HttpClient) {
  }

  addClient(clientForm) {
    return this.http.post<Client>(`${environment.baseUrl}/clients/`, clientForm, httpOptions).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return of(error.status);
      })
    );
  }

  

  getClients(pageNum) {
    return this.http.get<Client[]>(`${environment.baseUrl}/clients/?_page=${pageNum}&_limit=10`).pipe(
        map((data: any) => {
        
          return data;
        }),
        catchError((error) => {
          return of(error.status);
        })
      );
  }

  getSelectedClient(id) {
    return this.http.get<Client>(`${environment.baseUrl}/clients/1`).pipe(
      map((data: any) => { 
               
         return data
      }),

        catchError((error) => {
          return of(error.status);
        })
      );
  }

  deleteClient(id: number) {
    const url = `${environment.baseUrl}/clients/${id}`;
    return this.http.delete(url,  { observe: 'response' })
  }

  updateClient(updatedClient, id): Observable<Client> {
    const EditUrl = `${environment.baseUrl}/clients/${id}`;
    return this.http.patch<Client>(EditUrl, updatedClient,  httpOptions).pipe()
  }

  searchClient(key, keyword) {
    if (keyword) {
      keyword = keyword.trim();
    const options = keyword ?
      { params: new HttpParams().set(key, keyword) } : { }
   
    return this.http.get<Client[]>(`${environment.baseUrl}/clients/`, options).pipe();
    }
  }

  sortBy(word) {
    return this.http.get<Client[]>(`${environment.baseUrl}/clients/?_sort=${word}`).pipe(
      map((data: any) => {
      
        return data;
      }),
      catchError((error) => {
        return of(error.status);
      })
    );
  }
}
