import { Injectable } from '@angular/core';
import {
Resolve,
ActivatedRouteSnapshot,
RouterStateSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
   providedIn: 'root'
})
export class clientsListResolver implements Resolve<any> {
   constructor(private http: HttpClient) { }
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {

    return this.http.get(`${environment.baseUrl}/clients/`).pipe(catchError(error   => {
      return EMPTY
   }), mergeMap(something => {
         if (something) {
            return of(something)
         } else {
            return EMPTY;
         }
       })
     )
   }
 }