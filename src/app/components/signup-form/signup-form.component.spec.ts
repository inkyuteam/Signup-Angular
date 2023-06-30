import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupFormComponent } from './signup-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
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

  it('should handle the HTTP request for error messages', () => {
    const request = httpMock.expectOne('assets/error-messages.json');
    expect(request.request.method).toBe('GET');
    
    // Provide a mock response here
    const mockResponse = {
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password should have a minimum length of 8 characters',
      passwordNameConstraint: 'Password should not contain the word "password"',
    };
    request.flush(mockResponse);
  });

  it('should handle error messages request', () => {
    const errorMessages = {
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password should have a minimum length of 8 characters',
      passwordNameConstraint: 'Password should not contain the word "password"',
    };

    const request = httpMock.expectOne('assets/error-messages.json');
    request.flush(errorMessages);

    expect(component.errorMessages).toEqual(errorMessages);
  });
});
