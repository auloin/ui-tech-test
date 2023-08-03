# Technical test

## Introduction

Welcome to technical test 👋. The goal of this test is to measure your frontend development skills in a semi-realistic setting. You're about to build a mini form builder with some of the technologies we use at Tiro.health. The challenge is divided in several tasks and you'll notice that each task description has some links to usefull documentation that may help if you're not familiar with the tech we use.

## Getting started with the test

### Fork this repository
Fork this repository on GitHub to start developping on your own account.
This repository supports *Github CodeSpaces*. If you would have issues setting up your environment, know that your can launch VSCode in your browser directly from GitHub without the need to configure the environment.

### Setup the Environment
This application uses Vite to transpile React + TypeScript.

Install dependencies
```bash
yarn install
```

Run the development server
```bash
yarn dev
```

### Overview of the folder structure

- `/src/components` -> contains components that have multiple uses
- `/src/components/fields` -> contains components to render the differen Fields
- `/src/pages/` -> the pages that this application is built of. They contain React Components from the `./components` directory.
- `/src/App.tsx` -> the root level component
- `/src/country-service.ts` -> a funtion that fetches data on countries with the ability to filter on country name.

### During the test

1. Try to use the documentation when you're not familiar with a particular technology.
2. Commit regularly. This way we can reconstruct how you proceeded through the tasks
3. If you have questions: send an email or open a GitHub issue on this project. I'll try to respond ASAP.

### When you're ready with the test

1. Make sure you have commited and pushed all your changes
2. Initiate a Pull Request on GitHub. I'll review your PR and use it as a place to comment the results of the test

Good luck 💪🏻

## The Challenges
Next section goes over the list of challenges that you need to solve. 
Most of them do not have to be solves in order. So don't hesitate to skip and proceed with the next one if your stuck.

🔗 Each task has a list of resources that link to the documentation of relevant packages. Use these links, they might help you on the right track if you're lost.

### Create an edit and preview mode 
⏳ Estimated time 10 min <br/>
📂 Important files: `components/ModeSwitch/useMode.ts`, `components/ModeSwitch/ModeSwitch.tsx`  

Noticed the switch button in the "Designer" page? This is switch button is meant toggle between "Edit" and "Preview" mode but unfortunatly it doesn't work. The problem is that it is a local state hook `useReducer`. 

We want this mode-state to be part of the URL as a query parameter. The URL is also a piece of application state that can store variables.

**Re-mplement the `useMode` hook so it is synchronised with the URL Search paramete `mode`**

- `/designer?mode=edit` shoud put you in "Edit Mode"
- `/designer?mode=preview` should put you in "Preview Mode"

🌎 **Resources**:

- [React Router - useSearchParams](https://reactrouter.com/en/main/hooks/use-search-params)

### Create a sidebar with property forms for the fields 
⏳ Estimated time 20 min <br/>
📂 Important files: `components/Aside.tsx`, `components/useAside.tsx` 

Each field in the Form Buidler has some properties. The goal of this task is to make these properties editable through a form that is rendered in the sidepanel in the `<aside />`. 

Take a look at the TypeScript definition of the field in [`useField.ts`](./src/components/useFields.ts), each attribute (except `id`) should be configurable through a form. It would be nice if you can make the form automatically submits when the user has made it's change to the property.(similar to Figma's sidepanel). This way you can hide the submit button. We don't have handler to store the updated properties yet so you can just `console.log` them. In the next task we'll implement the `updateField` handler.

Make sure that the end-user can click on a field to highlight it and edit it's properties in the sidepanel. For this you'll need the code in `SelectionManager.tsx` and complete it further to a fully functional `useSelection` hook.

Each set of properties needs a corresponding field
Updating the properties from the form automatically when they are valid is a bonus.

Some challenges to think about:
1. The properties form needs to edit the state of a field while being rendered in a different place in the DOM.
2. Only one of the properties forms can be visible at a time. How do you keep track of the 'active' field?

🌎 **Resources**
- [React Portal](https://react.dev/reference/react-dom/createPortal)
- [React useRef](https://react.dev/reference/react/useRef)
- [HTML `<form/>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [Web API HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)
- [Web API FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)

### Implement an update field handler 
⏳ Estimated time 15 min <br/>
📂 Important files: `components/fields/useFields.tsx`

Currently the `useFields` hook has a very naïve implementation. It just returns the `INIT_FIELDS`. In this task we'll connect this hook to a global store that holds the fields using [Zustand](https://github.com/pmndrs/zustand). 


**Create a Zustand store with a `fields` attribute holding the form fields**.<br/> The store should accept field updates so that you can pass a update handler to the Form submit handler from previous task. Make sure to also pass the updates of the `<Label />` to the update handler you've just created.

If weren't able to complete previous step, make sure to implement an update field that matches the following TypeScript type:
```TypeScript
type UpdateFn = (field:Partial<Field>, index: number) => void
```

Editing the properties of a field is nice but a real form builder can also add and remove fields.<br/>
**Extend the store you've created by adding an *add* and *remove* field handler**.<br/>
If you're ready make sure to bind these handlers to the corresponding buttons in the FormBuilder. The 

🌎 **Resources**
- [Zustand - Typescript usage ](https://github.com/pmndrs/zustand#typescript-usage)

### Add a new field type: the country combobox
⏳ Estimated time 30 min <br/>
📂 Important files: `pages/Designer/Designer.tsx`, `components/fields/useFields`, and new file(s)

Instead of simply adding a input field for the users to enter their country of birth, we want a combobox that's generating suggestions.<br/>
**Create a new field type `country` and implement a Combobox using the [components provided by HeadlessUI](https://headlessui.com/react/combobox).**<br/>
You don't need the find an API service to generate country suggestions, there is already one available in [`country-service.ts`]. Just import the following function :
```Typescript 
import findCountries, { Country } from "../country-service"
```

You can use TanStack Query integrate the async `filterCountries` service in your component

🌎 **Resources**
- [TanStack Query - Query Basics](https://tanstack.com/query/latest/docs/react/guides/queries#query-basics)
- [HeadlessUI - Combobox](https://headlessui.com/react/combobox)
- [HeadlessUI - Combobox (using with HTML Forms)](https://headlessui.com/react/combobox#using-with-html-forms)

### Form Filler and Response
⏳ Estimated time 20 min <br/>
📂 Important files: `App.tsx`,`pages/Response/Response.tsx`, `components/fields/useFields`


Now the Form Builder is useable, we need to render the form in a seperate page so end users can fill it in.
<br/>**The goal of this task is to create a Form Filler and Form Response page.**<br/>
Copy the `<Designer/>` page and remove all designer related functionality. Leverage the data router capabilities of [React Router to handle Form submissions]() to pass the data to the Form Response page. The Form Response should only give read-only view of the entered data.

🌎 **Resources**
- [React Router - Route with action handlers](https://reactrouter.com/en/main/route/action)
- [React Router - Form component](https://reactrouter.com/en/main/components/form)
- [React Router - useActionData](https://reactrouter.com/en/main/hooks/use-action-data)

### Drag and Drop fields
⏳ Estimated time 20 min <br/>
📂 Important files: `pages/Designer/Designer.tsx`,`components/fields/FieldWrapper.tsx`,`components/fields/useFields.ts` 

Finally, we want to enable the users to move fields arround by using drag-and-drop interactions. The native Drag and Drop API is hard to use but luckily their are libraries to help us.

**Implement drag-and-drop on the fields by using *dnd-kit*s `useSortable` hook**

Once the drag-and-drop interaction is ready, we need to persist the new order of the fields in our form store.

**Extend the form store with a `move` handler that updates the order of the fields in the store**

🌎 **Resources**
- [dndkit - Sortable preset](https://docs.dndkit.com/presets/sortable)


You're done 🎉

Thanks for participating to the test 🙏
Make sure to commit everything and initiate a PR on GitHub