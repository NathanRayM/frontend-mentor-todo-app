![Todo app light](desktop-design-light.jpg)

![Todo app dark](desktop-design-dark.jpg)

<h1 align="center">Todo app</h1>

<div align="center">

[Live](https://nathanraym.github.io/frontend-mentor-todo-app/)
| [Solution](https://github.com/NathanRayM/frontend-mentor-todo-app.git)
| [Challenge](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW)

Solution for a challenge from [frontendmentor.io](https://www.frontendmentor.io/)

</div>

## About The Project

Your challenge is to build out this todo app and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- **Bonus**: Drag and drop to reorder items on the list
- **Bonus**: Build this project as a full-stack application

## Built with

- Semantic HTML5 markup
- Modern CSS (custom properties, responsive design, and hover states)
- Mobile-first workflow
- Flexbox for layout
- Vanilla JavaScript for dynamic DOM manipulation
- Local Storage API for persistent task data
- Event delegation for efficient event handling
- Accessible controls using ARIA attributes

## What I learned

This project helped reinforce how to manage application state using plain JavaScript and render the UI dynamically from that state. I built the task list so that all interactions—adding, deleting, filtering, and marking tasks as completed update a central tasks array and then re-render the DOM from that data.

I also gained more experience working with localStorage to persist data between page reloads, structuring code so multiple features (filters, counters, and clear-completed actions) could share the same data source.

Another key takeaway was understanding how DOM rendering affects event listeners. Because the task list is rebuilt whenever the state changes, I needed to ensure event listeners were attached at the correct time so features like drag-and-drop and filtering continued to work after re-rendering.

Overall, this project strengthened my confidence building a full interactive interface using vanilla JavaScript while keeping the code organized and maintainable.

## Acknowledgments

A big thank you to anyone providing feedback on my [solution](https://www.frontendmentor.io/solutions/interactive-rating-component---html-css-vanilla-js-XH7MvkT2Xl). It definitely helps to find new ways to code and find easier solutions!
