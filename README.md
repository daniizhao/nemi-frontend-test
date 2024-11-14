# NemiFrontendTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

Node Version: 22.113.0
Express: 4.21.1

This project has a small express server to manage reading and writing JSON files.

# Instructions to run project

On root project execute `node server.js` to run Express.

Open another terminal to run Angular project executing `npm run start`.

# Home Screen changes

There are some details on the homepage that I decided to change/add to improve the UX/UI.

### - Changed background color status to column attribute

Due to the colors chosen for the theme (Nemi's color palette), using the entire row background to indicate status could be visually overwhelming for users. A more appealing and intuitive approach would be to add a dedicated column with text labels ("active"/"inactive") and add a subtle background color.

### - Added filter by name

Once there are a lot of services created, it can become a problem if the user wants to search for an specific service to modify or delete. The solution is to add an input to allow the user to search by name.

# New Service changes

### - Duration selector

Created a custom time picker. Added the hour field, as the Input type="time" doesn't really allow to change the format. It is also a good change because a service could be longer than an hour.
