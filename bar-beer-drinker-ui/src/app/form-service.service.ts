import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(
    public http: HttpClient
  ) { }



  getResults() {
    console.log("Getting Results!")
    return this.http.get<any[]>('/api/send-results');
  }

  sendQueries(query: string) {
    return this.http.post('/api/form-example', query, {responseType: 'text'});
  }
}

