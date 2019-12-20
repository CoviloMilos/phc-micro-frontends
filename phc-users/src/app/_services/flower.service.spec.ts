import { TestBed } from '@angular/core/testing';

import { FlowerService } from './flower.service';
import { FlowerServiceMock, FLOWERS_DATA } from 'src/testing/mock/flowers.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FlowerService', () => {
  let service: FlowerServiceMock;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: FlowerService, useClass: FlowerServiceMock}
      ]
    });
    service = TestBed.get(FlowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getFlowers() function', () => {
    expect(service.getFlowers()).toBeTruthy();
  });

  it('should return array of flowers', () => {
    service.getFlowers()
      .subscribe(res => {
        expect(res).toEqual(FLOWERS_DATA);
    });
  });
  
});
