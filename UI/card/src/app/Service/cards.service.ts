import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../Models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  BASE_API_URL:string= 'https://localhost:7254/api/card';
  constructor(private _httpClient:HttpClient) { }

  getAllCards():Observable<Card[]>{
    return this._httpClient.get<Card[]>(this.BASE_API_URL);

  }
  addCard(card:Card):Observable<Card>{
    card.id="00000000-0000-0000-0000-000000000000";
    return this._httpClient.post<Card>(this.BASE_API_URL,card)
  }
  deleteCard(id:any){
    return this._httpClient.delete(this.BASE_API_URL+'/'+id);
  }
  updateCard(card:Card){
    return this._httpClient.put(this.BASE_API_URL+"/"+card.id,card)
  }
}
