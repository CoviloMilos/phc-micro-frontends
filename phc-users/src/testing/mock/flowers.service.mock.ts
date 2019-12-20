import { Observable, of } from 'rxjs';

export const FLOWERS_DATA: any[] = [
    {
      "description": "flower",
      "flower_id": "7",
      "name_lat": "flower",
      "name_ser": "flower",
      "watering_period": 3
    },
    {
      "description": "plant",
      "flower_id": "8",
      "name_lat": "plant",
      "name_ser": "plant",
      "watering_period": 1
    },
    {
      "description": "a",
      "flower_id": "10",
      "name_lat": "a",
      "name_ser": "a",
      "watering_period": 1
    },
    {
      "description": "floer",
      "flower_id": "11",
      "name_lat": "flower",
      "name_ser": "flower",
      "watering_period": 1
    },
    {
      "description": "flower",
      "flower_id": "12",
      "name_lat": "flower1",
      "name_ser": "flower1",
      "watering_period": 12
    }
  ];
export class FlowerServiceMock {

    getFlowers(): Observable<any[]> { 
        return of(FLOWERS_DATA);
    }
}