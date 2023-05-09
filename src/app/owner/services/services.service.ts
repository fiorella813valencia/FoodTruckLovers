import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  ownersRegistration:any[]=[];
  data: any[] = [];
  numOwners:number=0;

  constructor(private http:HttpClient) {}

  addOwner(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/owners',data);
  }
  getOwner():Observable<any>{
    return this.http.get('http://localhost:3000/owners');
  }
  deleteOwner(id:number):Observable<any>{
    return this.http.delete(`http://localhost:3000/owners/${id}`);
  }

  numberOfOwners(): Observable<any> {
    return this.http.get<any[]>('http://localhost:3000/owners').pipe(
      tap(data => {
        this.data = data;
        this.numOwners = data.length;
      })
    );
  }

  getnumOwners(): number {
    return this.numOwners;
  }
}
