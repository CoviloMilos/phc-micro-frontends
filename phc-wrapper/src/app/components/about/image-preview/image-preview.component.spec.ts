import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewComponent } from './image-preview.component';
import { MatDialogRef } from '@angular/material';

describe('ImagePreviewComponent', () => {
  let component: ImagePreviewComponent;
  let fixture: ComponentFixture<ImagePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [ ImagePreviewComponent ],
      providers: [
        { provide: MatDialogRef, useValue: ImagePreviewComponent }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
