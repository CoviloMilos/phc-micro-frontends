import { Observable, of } from 'rxjs';
import { FlowerCreate } from 'src/app/_models/flower.create';
import { FlowerUpdate } from 'src/app/_models/flower.update';

export const FLOWERS_DATA: any[] = [
    {
      description: 'flower',
      flower_id: '7',
      name_lat: 'flower',
      name_ser: 'flower',
      watering_period: 3
    },
    {
      description: 'plant',
      flower_id: '8',
      name_lat: 'plant',
      name_ser: 'plant',
      watering_period: 1
    },
    {
      description: 'a',
      flower_id: '10',
      name_lat: 'a',
      name_ser: 'a',
      watering_period: 1
    },
    {
      description: 'floer',
      flower_id: '11',
      name_lat: 'flower',
      name_ser: 'flower',
      watering_period: 1
    },
    {
      description: 'flower',
      flower_id: '12',
      name_lat: 'flower1',
      name_ser: 'flower1',
      watering_period: 12
    }
  ];
export class FlowersServiceMock {

    getFlowers(): Observable<any[]> {
        return of(FLOWERS_DATA);
    }

    createFlower(flower: FlowerCreate): Observable<any> {
      return of({msg: 'New flower added to DB.'});
    }

    updatFlower(flowerId: string, flower: FlowerUpdate): Observable<any> {
        return of({msg: 'Flower with flower_id 7 is updated.'});
    }

    deleteFlower(flowerId: number): Observable<any> {
        return of({msg: 'Flower with flower_id 7 is deleted from DB.'});
    }

}
