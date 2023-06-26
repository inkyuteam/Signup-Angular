Web Coding Challenge
Requirements
• Build a single page application with a sign-up form.
• The form should allow users to enter first name, last name, email, and password.
• All fields are required.
• The full name of the user should be shown in the UI outside of the form. It should use a single variable that is
updated whenever the input values are changed.
• Password validation:
o Should be a minimum of eight characters
o Should contain lower and uppercase letters
o Should not contain the user's first or last name
• Email should be validated but there are various ways of accomplishing this. So, show us what you consider as
a proper email validation.
• When submitting the form, two requests must be made:
o First request: HTTP GET to https://jsonplaceholder.typicode.com/photos/{last_name_length}
▪ Example request in case of name "Thomas Shelby": GET /photos/6
▪ The “thumbnailUrl” parameter from the response needs to be passed to the second request
o Second request: HTTP POST to https://jsonplaceholder.typicode.com/users
▪ The POST body includes the form values and the image url from the previous request
▪ Example request body:
{
"firstName": "Thomas",
"lastName": "Shelby",
"email": "thomas@shelby.co.uk",
"thumbnailUrl": "url-from-request-1"
}
How to do it
• Use the latest version of Angular in combination with TypeScript and the latest Angular features.
• UX/UI can be based on a CSS Framework (or do it yourself with minimal effort).
• You can target browsers that support ES6. Do not worry about supporting old browser versions.
• Make your solution available on GitHub or GitLab or Bitbucket.
How we review
Your application will be reviewed by two of our engineers. We take your experience level into consideration. The
aspects of your code we will assess include:
• Correctness - Is it production-ready application? Does the application do what was asked? If not, does the
README explain why it is missing and/or different?
• Code quality - Are there any code smells? Is the coding style consistent with the Angular style guide? Were
the latest features that the framework provides used?
• Testing - Is your logic covered with unit or integration tests?
• UX - Is the web interface understandable and pleasing to use? Was accessibility considered?
• Documentation - Is there a README covering how to build and run your project?
• Technical choices - Are choices of libraries, architecture etc. appropriate for the task?Good luck and have fun!
