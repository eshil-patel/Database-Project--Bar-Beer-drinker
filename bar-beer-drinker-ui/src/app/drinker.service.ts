import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface drinkerInfo
{
  drinkerId : string;
  name:string;
  address:string;
  phone:string;
}
export interface transInfo
{
  drinkerName: string;
  barName: string;
  itemName: string;
  price: string;
  hour:string;
}


@Injectable({
  providedIn: 'root'
})
export class DrinkerService {

  constructor(private http: HttpClient) 
  { }
  
  getDrinkers()
  {
    return this.http.get<drinkerInfo[]>('/api/drinker')
  }
  getdrinkerinfo(drinkerId:string)
  {
    return this.http.get<drinkerInfo>('/api/drinker/'+drinkerId)
  }
  gettransinfo(drinkerId:string)
  {
    return this.http.get<transInfo[]>('/api/trans/'+drinkerId)
  }
  gettranscounts(drinkerId:string)
  {
    return this.http.get<any[]>('/api/transcount/'+drinkerId)
  }

  getdrinkermonth(drinkerId:string)
  {
    return this.http.get<any[]>('/api/drinkermonth/'+drinkerId)
  }

  getdrinkerday(drinkerId:string)
  {
    return this.http.get<any[]>('/api/drinkerday/'+drinkerId)
  }

  getdrinkerweek(drinkerId:string)
  {
    return this.http.get<any[]>('/api/drinkerweek/'+drinkerId)
  }
}
