import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FlowerPreview } from '../_models/flowerpreview';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  private baseUrl = environment.apiUrl;
  private path = 'flowers/';
  httpOptions = {
    headers: new HttpHeaders()
  };


  constructor(private http: HttpClient) {
  }

  setupHeaders(token: string) {
    this.httpOptions.headers = new HttpHeaders({
      Accept: 'applications/json',
      Authorization: 'Bearer ' + token
    });
  }

  getFlowers(): Observable<FlowerPreview[]> {
    return this.http.get<FlowerPreview[]>(this.baseUrl + this.path, this.httpOptions);
  }
}
