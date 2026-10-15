# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot
Desktop:-
![Uploading desktop.jpg…]()
Mobile:-
<img width="987" height="825" alt="mobile" src="https://github.com/user-attachments/assets/60f6b65a-ecd6-4d49-9929-e52e1184b46d" />


### Links

- Solution URL: [Solution](https://todo-app-1159.netlify.app/todo/all)
- Live Site URL: [Live](https://todo-app-1159.netlify.app/todo/all)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Render](https://render.com/)
- [Neon Postgres](https://neon.com/)
- [Netlify](https://www.netlify.com)

### What I learned

Designed and developed a full-stack Todo application to practice and demonstrate end-to-end web application development, from building the user interface to developing REST APIs, integrating a relational database, and deploying the application to the cloud.
**Frontend Development:** Built the user interface using React and Vite, with separate views for All, Active, and Completed tasks to organize and manage todos.
In case the status of task is active then changes can be made when entered. Functiona are made to ensure that on empty task description no record to be updated or created and the previous task description is maintained as well. 
**Backend Development:** Developed RESTful APIs using Java and Spring Boot to handle task-related operations and connect the frontend with the database.
**Database Integration:** Integrated PostgreSQL using Spring Data JPA for persistent storage and retrieval of todo records, including task descriptions, creation and update timestamps, and active status.
**API Communication:** Connected the React frontend to the Spring Boot backend using HTTP requests and JSON data exchange.
**Cloud Database:** Used Neon PostgreSQL as the hosted database, enabling the application backend to access persistent data outside the local development environment.
**Live Deployment:** Deployed the React frontend on Netlify and the Spring Boot backend on Render, configuring production API URLs and environment-specific settings.
**Routing Configuration:** Configured React Router navigation and Netlify redirects to support direct access to application routes such as /todo/all.
**Deployment & Troubleshooting:** Worked through build configuration, environment variables, frontend-to-backend connectivity, CORS considerations, and deployment issues encountered during production setup.

Frontend Api:- todo/all,todo/active,todo/completed
Backend Api:-  /create,/retrieve,/update,/delete,/active,/completed,/clearIdWise/{id}/clear

To see how you can add code snippets, see below:

```Java
// save or create task in todo list
	@PostMapping("/create")
// get all the tasks irrespective of status active or completed.
	@GetMapping("/retrieve")
// update all the tasks
	@PutMapping("/update")
// clear or delete completed task from todo list
	@DeleteMapping("/delete")
// get all active tasks from todo list
	@GetMapping("/active")
// get all completed or inactive tasks from todo list
	@GetMapping("/completed")
// clear task idWise
	@DeleteMapping("/clearIdWise/{id}/clear")
```
```
ORDER BY is_active DESC,updated_on DESC 
```
```css
.darkTop input[type='checkbox'],
.darkTopOne input[type='checkbox'] {
    accent-color: var(--Navy_900);
    background-color: var(--Navy_900);
    appearance: none;
    height: 28.5px;
    width: 28.5px;
    border: 1px solid var(--Navy_850);
    background-image: none;
    position: relative;
    top: 0.9px;
    left: 0.8px;
}

.darkTop input[type='checkbox']:checked {
    background-image: var(--checkImg), var(--Check_Background);
    background-repeat: no-repeat;
    background-position: center;
    border: none;
}
```
```js

    // clear single todo/task based on id
    function clearIdWise(e, id) {
        console.log(e, ' id ', id);

        fetch(`${URL}/clearIdWise/${id}/clear`, {
            method: 'DELETE'
        })
            .then((res) => {
                console.log('res', res);
                return res.text();
            }).then((data) => {
                console.log('data', data);
                onRefresh();
                 // add or call toast container
                    toast.success(data,{
                        position:'top-center',
                        autoClose:3000,// for 2seconds 
                        theme:'colored'
                    });
                    //
            })
    }

 /* onKeyDown function on target value empty set to previous desc value when key=enter 
       else update the single todo/task desc by id only when key = enter and target value>0 
       Give Notification on successfull updation of todo/task description.*/
    function updateDesc(e, id, prevDesc) {
        let val = e.target.value;
        console.log('val1', val, ' length ', val.length);
        console.log('id', id);
        if (e.key == 'Enter' && val.length > 0) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('id', id);
            formData.append('desc', val);
            console.log('formData', formData);
            fetch(`${URL}/update`,
                {
                    method: 'PUT',
                    body: formData
                }).then((res) => {
                    console.log('res', res);
                    return res.text();
                })
                .then((data) => {
                    console.log('data', data);
                    onRefresh();
                     // add or call toast container
                    toast.success(data,{
                        position:'top-center',
                        autoClose:3000,// for 2seconds 
                        theme:'colored'
                    });
                    //
                })
        }

        else if (e.key == 'Enter' && val.length == 0) {
            console.log('enter prevDesc ', prevDesc);
            setDesc(prevDesc);
            e.target.value = prevDesc;
        }

    }

```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.


### Continued development

In the future, I will try to implement drag-and-drop functionality in the Todo app and maintain the same order in the backend as well.
I will improve the media queries and add an Enter key option for creating tasks on mobile devices, as currently, I am unable to create a new task from the mobile version of the webpage.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resourcesb

- [W3](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.



### AI Collaboration

Describe how you used AI tools (if any) during this project. This helps demonstrate your ability to work effectively with AI assistants.

- What tools did you use (e.g., ChatGPT, Claude, GitHub Copilot)? ChatGPT
- How did you use them (e.g., debugging, generating boilerplate, brainstorming solutions)? debugging
- What worked well? What didn't?


## Author

- Frontend Mentor - [@kudos2shef](https://www.frontendmentor.io/profile/kudos2Shef)


## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

