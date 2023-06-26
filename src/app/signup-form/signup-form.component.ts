import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  fullName: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.fullName = '';
  }

  submitForm(): void {
    // Perform any additional validation if needed

    // Make the first request to get the thumbnailUrl
    const last_name_length = this.lastName.length;
    this.makeFirstRequest(last_name_length);
  }

  makeFirstRequest(lastNameLength: number): void {
    // Perform the HTTP GET request to the provided URL
    const url = `https://jsonplaceholder.typicode.com/photos/${lastNameLength}`;
    // Use your preferred method/library to make the HTTP GET request
    // Retrieve the "thumbnailUrl" parameter from the response
    // Pass the thumbnailUrl to the second request
    const thumbnailUrl = 'url-from-request-1';

    this.makeSecondRequest(thumbnailUrl);
  }

  makeSecondRequest(thumbnailUrl: string): void {
    // Prepare the request body for the HTTP POST request
    const requestBody = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      thumbnailUrl: thumbnailUrl,
    };

    // Perform the HTTP POST request to the provided URL with the requestBody
    const url = 'https://jsonplaceholder.typicode.com/users';
    // Use your preferred method/library to make the HTTP POST request
    // Pass the requestBody in the request body
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
