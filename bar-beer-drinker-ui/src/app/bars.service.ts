import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Bar {
  name: string;
  license: string;
  city: string;
  phone: string;
  addr: string;
}

export interface BarMenuItem {
  beer: string;
  manf: string;
  price: number;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) { }

  getBars() {
    return this.http.get<Bar[]>('/api/bar');
  }

  getBar(bar: string) {
    return this.http.get<Bar>('/api/bar/' + bar);
  }

  getMenu(bar: string) {
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getFrequentCounts() {
    return this.http.get<any[]>('/api/frequents-data');
  }

  getTopDrinkers(barId: string) {
    return this.http.get<any[]>('/api/top-drinkers/' + barId);
  }

  getTopPurchases(barId: string) {
    return this.http.get<any[]>('/api/top-purchases/' + barId);
  }

  getTopManufacturers(barId: string) {
    return this.http.get<any[]>('/api/top-manufacturers/' + barId);
  }

  getSaleDates(barId: string) {
    return this.http.get<any[]>('/api/sale-dates/' + barId);
  }

  getSaleHours(barId: string) {
    return this.http.get<any[]>('/api/sale-hours/' + barId);
  }
}
