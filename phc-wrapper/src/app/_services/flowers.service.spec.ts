import { TestBed } from '@angular/core/testing';

import { FlowersService } from './flowers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FlowersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [

    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: FlowersService = TestBed.get(FlowersService);
    expect(service).toBeTruthy();
  });
});
