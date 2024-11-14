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

As the number of services grows, finding a specific service to see its information, modify or delete could become challenging for the user. Adding a search input that allows users to filter services by name, id or any property is the best solution to this problem.

### - Added Expandable rows

To show the free points create and center of location of the service in a map.

# New Service changes

### - Duration selector

I created a custom time picker and added the hour field, as the default `<input type="time" />` doesn't allow for format customization (or I didn't find how to). This change also supports services that may last longer than an hour, removing a restriction for the services.
