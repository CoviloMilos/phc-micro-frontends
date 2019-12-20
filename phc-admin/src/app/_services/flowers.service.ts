import { HeadersSetup } from './../_shared/headers.setup';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Flower } from '../_models/flower';
import { Observable } from 'rxjs';
import { FlowerUpdate } from '../_models/flower.update';
import { FlowerCreate } from '../_models/flower.create';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlowersService implements HeadersSetup {
  private baseUrl = environment.apiUrl;
  private path = 'flowers/'
  private httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private http: HttpClient) { }

  setupHeaders(token: string) {
    this.httpOptions.headers = new HttpHeaders({
      'Accept': 'applications/json',
      'Authorization': 'Bearer ' + token
    })
  }

  getFlowers(): Observable<Flower[]> { 
    return this.http.get<Flower[]>(this.baseUrl + this.path, this.httpOptions);
  }

  createFlower(flower: FlowerCreate) {
    return this.http.post<any>(this.baseUrl + this.path, flower, this.httpOptions);
  }

  updatFlower(flowerId: string, flower:FlowerUpdate) {
    return this.http.put<any>(this.baseUrl + this.path + flowerId + '/', flower, this.httpOptions);
  }

  deleteFlower(flowerId: number) {
    return this.http.delete<any>(this.baseUrl + this.path + flowerId + '/', this.httpOptions);
  }
}
