import { Injectable } from '@angular/core';
import { FlowerGlobal } from '../_models/flower.global';

@Injectable({
  providedIn: 'root'
})
export class User2FlowerLocalService {

  private flowerLocal: FlowerGlobal = {
    date_of_inception: '',
    email: true,
    flowerName: ''
  };

  constructor() { }

  getFlowerLocal() {
    return this.flowerLocal;
  }

  setFlowerLocal(flower: FlowerGlobal) {
    this.flowerLocal = flower;
  }
}
