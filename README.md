# Technical test 👩‍🔬


Welcome to the technical test 👋. 

The goal of this test is to measure your front-end development skills in a realistic setting. You're about to build a mini form builder with some of the technologies we use at Tiro.health. The challenge is divided into several tasks and you'll notice that each task description has some links to useful documentation that may help if you're not familiar with the tech we use.

## Getting started with the test

### Fork this repository
Fork this repository on GitHub to start developing on your own account.
This repository supports *Github CodeSpaces*. If you have issues setting up your environment, know that your can launch VSCode in your browser directly from GitHub through Github CodeSpaces without the need to configure the environment.

### Setup the Environment
This application uses [Vite](https://vitejs.dev/) to transpile React + TypeScript.

Make sure you have installed `yarn`, if not, follow the installation instructions: https://classic.yarnpkg.com/lang/en/docs/install/

Install dependencies
```bash
yarn install
```

Run the development server
```bash
yarn dev
```

### Overview of the folder structure

- `/src/components` -> contains components (or hooks) that may be used in multiple places
- `/src/components/fields` -> contains components to render the different Fields
- `/src/pages/` -> components that render the pages of this application which are used in the router
- `/src/App.tsx` -> the root level component containing the router.
- `/src/country-service.ts` -> a function that fetches data on countries with the ability to filter on the country name.

### During the test

1. Try to use documentation when you're not familiar with a particular technology. There are *useful links* for each task.
2. Commit regularly. This way we can reconstruct how you proceeded through the tasks.
3. If you have questions, email or open a GitHub issue on this project. I'll try to respond ASAP.

### When you're ready with the test

1. Make sure you have committed and pushed all your changes.
2. Initiate a Pull Request on GitHub. I'll review your PR and add comments to your code.

Good luck 💪🏻

## The Challenges
The next section goes over the list of challenges that you need to solve. 
Most of them do not have to be solved in order. So don't hesitate to skip and proceed with the next one if you're stuck.

🔗 Each task has a **list of useful links** to documentation of relevant packages/techniques. **Use these links**, they will help you on the right track if you're lost.

### Create an edit and preview mode 
⏳ Estimated time 15 min <br/>
📂 Important files: `components/ModeSwitch/useMode.ts`, `components/ModeSwitch/ModeSwitch.tsx`  

Notice the switch button on the "Designer" page? This switch button is meant toggle between "Edit" and "Preview" mode but unfortunately it doesn't work. The problem is that it is based on the local state hook: `useReducer`. 

We want this piece of state to be part of the URL as a query parameter and expose it as a hook with the same interface.

➡️ **Re-implement the `useMode` hook so it that is synchronized with the URL Search parameter `mode`**

Examples of how it should work:
- `/designer?mode=edit` should put you in "Edit Mode"
- `/designer?mode=preview` should put you in "Preview Mode"
- `/designer` should put you in "Preview Mode"
- `/other` should put you in "Preview Mode"

If you don't manage to complete this task, you can still manually set the state to `edit` or `preview` to complete subsequent tasks.

🌎 **Useful links**:

- [React Router - useSearchParams](https://reactrouter.com/en/main/hooks/use-search-params)
---
### Create a sidebar with property forms for the fields 
⏳ Estimated time 30 min <br/>
📂 Important files: `components/Aside.tsx`, `components/useAside.tsx` 

Each field in the Form Builder has some properties. <br/>➡️ **The goal of this task is to make the properties of a field editable through a form that is rendered in the side panel `<aside />`.** 

Take a look at the TypeScript definition of the field in [`useField.ts`](./src/components/useFields.ts), each attribute (except `id`) should be configurable through a form. Bonus points if you can make the form submit automatically when the user has made its changes without clicking on the submit button. This way you can hide the submit button. 
We'll create the `onSubmit` handler in the next task so you can just put `console.log` as the handler of the Form Submit event.

Make sure that the end-user can click on a field to highlight it and edit its properties in the side panel. Think of other software like Powerpoint or Figma where you can click on a particular element to edit its properties. That's the behavior we want to implement for our *fields*.
In order to achieve this, you'll need the code in `SelectionManager.tsx` and complete it further to a fully functional `useSelection` hook.
The goal of the `useSelection` hook is to keep track of the selected field by storing its `id` in the SelectionManager and rerendering when the `id` changes. The hook returns a boolean indicating if the current field (given the `id` of the field) is selected and a method to select the current field. Based on this `isSelected` state you can highlight the field and show its corresponding properties form in the side panel.

🌎 **Useful links**
- [React Portal](https://react.dev/reference/react-dom/createPortal)
- [React useRef](https://react.dev/reference/react/useRef)
- [React useEffect](https://react.dev/learn/synchronizing-with-effects#subscribing-to-events)
- [HTML `<form/>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [Web API HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)
- [Web API FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)

---
### Implement an update field handler 
⏳ Estimated time 20 min <br/>
📂 Important files: `components/fields/useFields.tsx`

Currently, the `useFields` hook has a very naïve implementation. It just returns the `INIT_FIELDS`. In this task we'll connect this hook to a global store that holds the fields using [Zustand](https://github.com/pmndrs/zustand). 


➡️ **Create a Zustand store with a `fields` attribute holding the form fields**.<br/> The store should accept field updates so that you can pass them to the Form Submit handler from the previous task. Make sure to also pass the updates of the `<Label />` to the update handler you've just created.

If you weren't able to complete the previous step, make sure to implement an update field that matches the following TypeScript type:
```TypeScript
type UpdateFn = (field:Partial<Field>, id: string) => void
```

Editing the properties of a field is cool but a real form builder can also add and remove fields.<br/>
➡️ **Extend the store you've created by adding an *add* and *remove* field handler**.<br/>
If you're ready make sure to bind the add handler to the buttons in the bottom of the FormBuilder and the remove handler to the *Trash*-button to the left of the *Fields*.

🌎 **Useful links**
- [Zustand - Updating state](https://docs.pmnd.rs/zustand/guides/updating-state)
- [Zustand - Typescript usage](https://github.com/pmndrs/zustand#typescript-usage)
---
### Drag and Drop fields
⏳ Estimated time 20 min <br/>
📂 Important files: `pages/Designer/Designer.tsx`,`components/fields/FieldWrapper.tsx`,`components/fields/useFields.ts` 

Finally, we want to enable the users to move fields around by using drag-and-drop interactions. The native Drag and Drop API is hard to use so luckily there are libraries like [@dndkit](https://docs.dndkit.com) to help us.

➡️ **Implement drag-and-drop on the fields by using *dnd-kit*s `useSortable` hook**
You won't have a handler yet for the `onDragEnd` event, so just use a `console.log`.

Once the drag-and-drop interaction is ready, we need to persist in the new order of the fields in our Zustand Form store. If you didn't manage to build the store, you'll need to skip this part.

➡️ **Extend the form store with a `move` method that updates the order of the fields in the store**

🌎 **Useful links**
- [dndkit - Sortable preset](https://docs.dndkit.com/presets/sortable)
- [Array - findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [Array - splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

---
### Add a new field type: the country combobox
⏳ Estimated time 30 min <br/>
📂 Important files: `pages/Designer/Designer.tsx`, `components/fields/useFields`, and new file(s) 😁

We need an extra field component for Country input.
Instead of using simple text input for the users to enter their country of birth, we want a combobox that's generating suggestions.<br/>
➡️ **Create a new field type `country` and implement a Combobox using the [components provided by HeadlessUI](https://headlessui.com/react/combobox).**<br/>
Use the `findCountries` function from `country-service.ts` to return a list of countries given a query:

```Typescript 
import findCountries, { Country } from "../country-service"
```

You can use TanStack Query to integrate the async `filterCountries` fetch function in your component.

🌎 **Useful links**
- [TanStack Query - Query Basics](https://tanstack.com/query/latest/docs/react/guides/queries#query-basics)
- [HeadlessUI - Combobox](https://headlessui.com/react/combobox)
- [HeadlessUI - Combobox (using with HTML Forms)](https://headlessui.com/react/combobox#using-with-html-forms)
---

### Form Filler and Response
⏳ Estimated time 20 min <br/>
📂 Important files: `App.tsx`,`pages/Response/Response.tsx`, `components/fields/useFields`

Now the Form Builder is useable, we need to render the form on a separate page so end-users can fill it in.
<br/>➡️ **The goal of this task is to create a Form Filler and Form Response page.**<br/>
Copy the `<Designer/>` page and remove all designer-related functionality. Leverage the data router capabilities of [React Router to handle Form submissions](https://reactrouter.com/en/main/components/form) to pass the data to the Form Response page. The Form Response should only give a read-only view of the entered data.

🌎 **Useful links**
- [React Router - Route with action handlers](https://reactrouter.com/en/main/route/action)
- [React Router - Form component](https://reactrouter.com/en/main/components/form)
- [React Router - useActionData](https://reactrouter.com/en/main/hooks/use-action-data)

---

Well done, you're ready! 🎉

Thanks for participating in this technical challenge. 🙏

❗Make sure to commit everything and initiate a PR on GitHub.
