import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})

export class SignupFormComponent {
  private _firstName: string;
  private _lastName: string;
  email: string;
  password: string;
  fullName: string;
  errorMessages: any;

  constructor(private errorMessageService: ErrorMessageService, private http: HttpClient) {
    this._firstName = '';
    this._lastName = '';
    this.email = '';
    this.password = '';
    this.fullName = '';
  }

  ngOnInit(): void {
    this.errorMessageService.getErrorMessages().subscribe(
      (errorMessages) => {
        this.errorMessages = errorMessages;
      },
      (error) => {
        console.error('Failed to load error messages:', error);
        this.errorMessages = {};
      }
    );
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
    this.updateFullName();
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
    this.updateFullName();
  }

  submitForm(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const last_name_length = this.lastName.length;
    this.makeFirstRequest(last_name_length);
  }

  makeFirstRequest(lastNameLength: number): void {
    const url = `https://jsonplaceholder.typicode.com/photos/${lastNameLength}`;

    this.http.get<any>(url).subscribe(data => {
      const thumbnailUrl = data.thumbnailUrl;
      this.makeSecondRequest(thumbnailUrl);
    }, error => {
      console.log('Error:', error);
    });
  }

  makeSecondRequest(thumbnailUrl: string): void {
    const requestBody = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      thumbnailUrl: thumbnailUrl,
    };

    const url = 'https://jsonplaceholder.typicode.com/users';
    this.http.post<any>(url, requestBody).subscribe(response => {
      console.log('Second request response:', response);
    }, error => {
      console.log('Error:', error);
    });
  }

  passwordContainsName(): boolean {
    if (!this.password || !this.firstName || !this.lastName) {
      return false;
    }

    const lowercasePassword = this.password.toLowerCase();
    const lowercaseFirstName = this.firstName.toLowerCase();
    const lowercaseLastName = this.lastName.toLowerCase();

    return (
      lowercasePassword.includes(lowercaseFirstName) ||
      lowercasePassword.includes(lowercaseLastName)
    );
  }

  updateFullName(): void {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
