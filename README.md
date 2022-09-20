# Test Aller Media

## Task description

_create a React application that makes a request to the provided URL, and renders the rows and articles in accordance with the JSON response._

_Each article should have an edit button which swaps out the title with an input field that allows the user to edit and save the title._

### My notes/questions/declarations

If this would be a real project, I would have asked some question about the functionality of the application like the following:

-   Could I use a mondal as the editing interface?
-   Is the articles supposed to be clickable, or is this just ment for editing the titles of the articles?
-   When you save the title, should it send a request (this would require refactoring)?

Other declarations:

-   As this is just a test and no design was provided, I would assume that styling is not big factor of the test.
-   Abit unsure if I needed to link to the article themself or not, as it stated in the task **"The other fields are hopefully self-explanatory."**, and therefor assumed the url field should be used.
-   Nothing about responsiveness is stated, but added a breakpoint to make the application "usable" on mobile.
-   There is no id on the articles from the request that could be used as keys, so I used the type and index combination to create unique keys (used in .map).

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Note

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
