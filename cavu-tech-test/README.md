# cavu-tech-test

This template should help get you started developing with Vue 2.7.13 in Vite.

Had to use 2.7.13 for composition api, didnt want to add https://www.npmjs.com/package/@vue/composition-api

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# README #

### Overview ###

Your task is to build a flight Departures board as per [this design](https://www.figma.com/file/Kr6pYxQbIdbfD5wG3Mo6QP/Tech-Test-FID?node-id=2%3A2), and populate it with data consumed from the [flights data API](https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata).

We would expect this task to take a few hours, however there is no strict time limit and you won't be judged on how long it takes you to complete.

### Details ###

**Your solution MUST:**

* Function as a single page app.
-- Done
* Use HTML and CSS (using pre-compilers such as LESS and Sass or CSS-in-JS is fine).
-- Would use SASS if production, some small builder and probably some underlying framework (not bootstrap!)
* Use **VueJS v2** and vanilla JavaScript. You *may* use Nuxt - we'll leave this up to you.
-- Originally built it in 3, then ported it back to 2, then built it from scratch in 2.7.13 - should have read the readme better first time!
* Support the major browsers (Chrome, Firefox, Safari, Edge).
-- Should work, though needs testing!
* Be responsive.
-- Should work
* Have (partial or full) test coverage.
-- Didnt think this was needed
* Include a README.md with details of how to run your solution, and any other information you think we might want.
-- * gestures wildly *

**Your solution MUST include the following features:**

* Include a form below the Departures board to allow the user to select each flight,
and update the status. Status options should include:
  * Free text
  * Departed
  * Diverted
  * Delayed
  * Cancelled
-- Done

* Error handling - if the API call fails, an error message should be displayed to the user.
-- Would handle if likley with the test, if no DATA - only shows loading, nothing breaks as such.
-- Would integrate offline functionality and PWA tooling to combat this. 
-- Would also leverage caching or store or even session/local storage depedning on the app and data in question

**Optional Enhancements:**

If you'd like to go above and beyond the minimum requirements, we'd love you to show us what you're capable of!

Here are some pointers you might like to consider:

* How you might use arrivalAirport.countryName to improve the Departures board UI?
* How will the board look before it receives data?
-- Added a basic loader
* How will the board update once it receives data?
-- Nothing fancy in terms of animation, just output the data. Animation would come after core functionality is agreed and prototyped
* How should the flights be ordered on the board?
-- Ideally from the API response, but added sorting options to each column
* How will the board update when a flight's status is updated?
-- Puts that item to the top of the list
* If a flight is diverted, what happens to the destination on the board?
-- Free text field to the rescue
* What next steps might you take? You can include these in your README.md.

## NEXT STEPS
* Compartmentalise more. Make more simplisting pattern elements
* Make more things utility
* Make an API handling helper class
* Make a layout / page view
* Use vue3/Nuxt (Or React/Next)
* Include storybook to start collating pattern elements
* Add some testing
* Refine the UI
* Fix design oddeties
* Make things cleverer in general
* Request amends to the API to enhance frontend code
* Add real pagination
* Add real filtering (API driven)


### External Packages ###

You are free to use external packages in your solution. Links to any external packages should be included in your README.md, along with 
your reasoning for using each package.