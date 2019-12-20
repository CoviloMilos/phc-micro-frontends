import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FlowerPreview } from '../_models/flowerpreview';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowersService {
  private baseUrl = environment.apiUrl;
  private path = 'flowers/';
  private token = localStorage.getItem('jwt-token');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) { }

  getFlowers(): Observable<FlowerPreview[]> {
    return this.http.get<FlowerPreview[]>(this.baseUrl + this.path, this.httpOptions);
  }
}
