import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [SignupFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update fullName when firstName and lastName are changed', () => {
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.updateFullName();
    expect(component.fullName).toEqual('John Doe');
  });

  it('should make the first HTTP request with the correct URL', () => {
    const lastNameLength = 3;
    component.lastName = 'Doe';

    component.makeFirstRequest(lastNameLength);

    const request = httpMock.expectOne(`https://jsonplaceholder.typicode.com/photos/${lastNameLength}`);
    expect(request.request.method).toBe('GET');
  });

  it('should make the second HTTP request with the correct data', () => {
    const thumbnailUrl = 'https://example.com/thumbnail.jpg';
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.email = 'john@example.com';

    component.makeSecondRequest(thumbnailUrl);

    const expectedRequestBody = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      thumbnailUrl: thumbnailUrl,
    };

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(expectedRequestBody);
  });

  it('should display a welcome message after successful form submission', () => {
    spyOn(window, 'alert');
    const form = {
      invalid: false,
    } as any;
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.email = 'john@example.com';

    component.submitForm(form);

    const thumbnailUrl = 'https://example.com/thumbnail.jpg';
    const request = httpMock.expectOne(`https://jsonplaceholder.typicode.com/photos/${component.lastName.length}`);
    request.flush({ thumbnailUrl });
    const secondRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    secondRequest.flush({});
    expect(window.alert).toHaveBeenCalledWith('Welcome! You are successfully registered.');
  });
});
