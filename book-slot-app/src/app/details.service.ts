import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  URL = "http://localhost:3000/details";
  constructor(private _http: HttpClient) { }

  getAppointmentList() {
    return this._http.get(this.URL);
  }
  bookSlot(data: any,id: number) {
    return this._http.put(`${this.URL}/${id}`, data);
  }
  getCurrentData(id: number){
    return this._http.get(`${this.URL}/${id}`);
  }

}
