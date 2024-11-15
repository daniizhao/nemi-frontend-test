# NemiFrontendTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

Node Version: 22.113.0
Express: 4.21.1

This project has a small express server to manage reading and writing JSON files.

# Instructions to run project

On project root execute `node server.js` to run Express.

Open another terminal on project root to run Angular project executing `npm run start`.

# Changes

Some changes has been made from the original exercise

* **Status indicator:** Originally, the background of the row had to indicate the status of the service. I think that solution could be overstimulating for the user so I decided to add an extra column to indicate the status with a label with the background color.
* **Duration format:** Due to complications to change the format in the `<input type="time" />` component, I added the hour field in the duration.

# Additional features

Some additional features have been implemented to improve the platform usability.

* **List Filter:** Allows user to search easily for any service.
* **Actions buttons:** Added an extra column with icons with the following features:
  - **Edit:** Allows user to edit an existing service.
  - **Delete:** Allows user to delete an existing service.
  - **Expand row:** Allows user to selected row to show a map, centered in the correspondint center of service and its corresponding freePoints.

