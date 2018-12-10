import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface item{
  itemName:string;
  itemId:string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }
  getitem(itemId:string)
  {
    return this.http.get<item>('/api/getiteminfo/'+itemId);
  }
  getpop(itemId:string)
  {
    return this.http.get<any[]>('api/items/'+itemId);
  }
  getitemdrinkerpop(itemId:string)
  {
    return this.http.get<any[]>('/api/itemdrinker/'+itemId)
  }
  
  getitemdaydist(itemId:string)
  {
    return this.http.get<any[]>('/api/itemdays/'+itemId)
  }

  getitemtimedist(itemId:string)
  {
    return this.http.get<any[]>('/api/itemtime/'+itemId)
  }
}
