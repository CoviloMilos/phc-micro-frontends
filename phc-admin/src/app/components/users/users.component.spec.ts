import { AlertifyServiceMock } from './../../../testing/mock/alertify.service.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { USERS_DATA } from 'src/testing/mock/users.service.mock';
import { UsersComponent } from './users.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule, MatIconModule, MatPaginatorModule, MatRadioModule, MatInputModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UsersService } from 'src/app/_services/users.service';
import { By } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UsersComponent,
        CreateUserDialogComponent,
        UpdateUserDialogComponent,

      ],
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
        AlertifyService,
        UsersService,
        {provide: AlertifyService, useClass: AlertifyServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource(USERS_DATA);
    component.token = 'secrettoken';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return users from UsersService OnInit', () => {
    spyOn(component, 'getUsers');
    component.token = 'secrettoken';
    component.ngOnInit();
    expect(component.getUsers).toHaveBeenCalled();
  });

  it('should fill datasource for mattable after OnInit', () => {
    spyOn(component, 'getUsers');
    component.ngOnInit();
    expect(component.getUsers).toHaveBeenCalled();
    expect(component.dataSource).not.toBeNull();
  });

  it('should have headers on table', () => {  
    expect(component.dataSource.data).toBe(USERS_DATA);

    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(USERS_DATA.length + 1);

      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('User ID');
      expect(headerRow.cells[1].innerHTML).toBe('First Name');
      expect(headerRow.cells[2].innerHTML).toBe('Last Name');
      expect(headerRow.cells[3].innerHTML).toBe('Username');
      expect(headerRow.cells[4].innerHTML).toBe('Email');
      expect(headerRow.cells[5].innerHTML).toBe('Admin');

    });
  });

  it('should on openDialogCreate() open MatDialog for user create', (done)=> {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'openDialogCreate');
    button.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.openDialogCreate).toHaveBeenCalled();
      done();
    });

  });

  it('should on openDialogEdit() open MatDialog for user edit', () => {
    expect(component.dataSource.data).toBe(USERS_DATA);
    spyOn(component, 'openDialogEdit');
    let btn = fixture.debugElement.query(By.css('.edit'));
    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();
      btn.triggerEventHandler('click', 1);

      expect(component.openDialogEdit).toHaveBeenCalled();
    });

  });

  it('should on handleDelete() open MatDialog for user delete', () => {
    expect(component.dataSource.data).toBe(USERS_DATA);
    spyOn(component, 'handleDelete');
    let btn = fixture.debugElement.query(By.css('.delete'));

    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();
      btn.triggerEventHandler('click', 1);
      expect(component.handleDelete).toHaveBeenCalled();
    });

  });

  it('should on filter input call applyFilter', () => {
    expect(component.dataSource.data).toBe(USERS_DATA);
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      el.value = 'someuser';
      //el.keyUp(); 
      expect(component.applyFilter).toHaveBeenCalled();
    });
  });

});
