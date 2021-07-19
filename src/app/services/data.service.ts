import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private link = 'http://localhost/triad/';

  constructor(private http: HttpClient) {}

  request(endpoint, data){
    return this.http.post(this.link + endpoint, JSON.stringify(data));
  }
}
