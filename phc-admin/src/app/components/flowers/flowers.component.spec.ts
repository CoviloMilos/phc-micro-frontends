import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FlowersComponent } from './flowers.component';
// tslint:disable-next-line: max-line-length
import { MatTableModule, MatFormFieldModule, MatIconModule, MatPaginatorModule, MatRadioModule, MatDialogModule, MatInputModule, MatTableDataSource } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FLOWERS_DATA } from 'src/testing/mock/flowers.service.mock';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AlertifyServiceMock } from 'src/testing/mock/alertify.service.mock';

describe('FlowersComponent', () => {
  let component: FlowersComponent;
  let fixture: ComponentFixture<FlowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowersComponent ],
      imports: [
        MatTableModule,
        MatFormFieldModule,
        MatIconModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatRadioModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule
    ],
    providers: [
      { provide: AlertifyService, useClass: AlertifyServiceMock },
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowersComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource(FLOWERS_DATA);
    component.token = 'secrettoken';
    component.ngOnInit();
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return flowers from FlowersService OnInit', () => {
    spyOn(component, 'getFlowers');
    fixture.detectChanges();
    expect(component.getFlowers).toHaveBeenCalled();
  });

  it('should fill datasource for mattable after OnInit', () => {
    spyOn(component, 'getFlowers');
    component.dataSource = new MatTableDataSource(FLOWERS_DATA);
    fixture.detectChanges();
    expect(component.getFlowers).toHaveBeenCalled();
    expect(component.dataSource).not.toBeNull();
  });

  it('should have headers on table', () => {
    expect(component.dataSource.data).toBe(FLOWERS_DATA);

    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();

      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(FLOWERS_DATA.length + 1);

      const headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('Flower ID');
      expect(headerRow.cells[1].innerHTML).toBe('Name on Serbian');
      expect(headerRow.cells[2].innerHTML).toBe('Name on Latin');
      expect(headerRow.cells[3].innerHTML).toBe('Watering Period');
      expect(headerRow.cells[4].innerHTML).toBe('Description');

    });
  });

  it('should on openDialogCreate() open MatDialog for user create', (done) => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'openDialogCreate');
    button.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.openDialogCreate).toHaveBeenCalled();
      done();
    });
  });

  it('should on openDialogEdit() open MatDialog for user edit', () => {
    expect(component.dataSource.data).toBe(FLOWERS_DATA);
    spyOn(component, 'openDialogEdit');
    const btn = fixture.debugElement.query(By.css('.edit'));
    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();
      btn.triggerEventHandler('click', 1);

      expect(component.openDialogEdit).toHaveBeenCalled();
    });

  });

  it('should on handleDelete() open MatDialog for user delete', () => {
    expect(component.dataSource.data).toBe(FLOWERS_DATA);
    spyOn(component, 'handleDelete');
    const btn = fixture.debugElement.query(By.css('.delete'));

    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();
      btn.triggerEventHandler('click', 1);
      expect(component.handleDelete).toHaveBeenCalled();
    });
  });

  it('should on filter input call applyFilter', () => {
    expect(component.dataSource.data).toBe(FLOWERS_DATA);
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el.value = 'flower';
      // el.keyUp();
      expect(component.applyFilter).toHaveBeenCalled();
    });
  });

});
