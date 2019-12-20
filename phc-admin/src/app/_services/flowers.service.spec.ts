import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlowersService } from './flowers.service';
import { FlowersServiceMock, FLOWERS_DATA } from 'src/testing/mock/flowers.service.mock';
import { FlowerCreate } from '../_models/flower.create';
import { FlowerUpdate } from '../_models/flower.update';

describe('FlowersService', () => {
  let service: FlowersServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FlowersServiceMock,
        {provide: FlowersService, useClass: FlowersServiceMock}
      ]
    });
    service = TestBed.get(FlowersServiceMock);
  });

  it('should be created', () => {
    const service: FlowersService = TestBed.get(FlowersService);
    expect(service).toBeTruthy();
  });

  it('should return array of flowers', () => {
    service.getFlowers()
      .subscribe(res => {
        expect(res).toEqual(FLOWERS_DATA);
    });
  });

  it('should return Observable of any for create flower', () => {
    let mockFlower: FlowerCreate = {
      description: FLOWERS_DATA[0].description,
      name_lat: FLOWERS_DATA[0].name_lat,
      name_ser: FLOWERS_DATA[0].name_ser,
      watering_period: FLOWERS_DATA[0].watering_period.toString()
    };
    service.createFlower(mockFlower)
      .subscribe(res => {
        expect(res).toEqual({msg: 'New flower added to DB.'});
      });
  });

  it('should return Observable of any for update flower', () => {
    let mockFlower: FlowerUpdate = {
      watering_period: FLOWERS_DATA[0].watering_period.toString()
    };

    service.updatFlower('7', mockFlower)
      .subscribe(res => {
        expect(res).toEqual({msg: 'Flower with flower_id 7 is updated.'});
      });
  });

  it('should return Observable of any for delete flower', () => {
    service.deleteFlower(7)
      .subscribe(res => {
        expect(res).toEqual({msg: 'Flower with flower_id 7 is deleted from DB.'});
      })
  });
  
});
