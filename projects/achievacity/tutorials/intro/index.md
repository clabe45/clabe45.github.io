# Getting Started
## Getting Your Feet Wet
Welcome to the Achievacity development team! This page assumes you know nothing about the project's code and would like to get started.

## Tasks
A *task* is defined as an action that the user wants to do; either a *routine* or a *goal*. A routine is done on a regular basis. Chores are a good example of routines - you do them every week or day usually. There don't have a definitive end. Goals, on the other hand, are _not_ done on a regular basis. They usually do have a definitive end. Here are some examples of goals: _plant watermelon_, _schedule visit with chiropractor_, _complete outline for school project_.

## Users vs. App
Before we get into the code, you have to know the two core components of this project:

 - **The users** - This refers to the project's dependency [UserSpice](https://userspice.com). This dependency (mainly located in the `users` directory) handles user login, registration, messaging, and more.
 - **The app** - This refers to the main functionality of the web app. This is where the lists of goals are created and used.

## Structure of the App
### Frontend
The app's client-side is divided into several files, each representing one core task action:

 - `create.js` - front-end functionality for creating new tasks
 - `edit.js` - front-end functionality for modifying single values of existing tasks
 - (No delete)\* - this might change later on; but since it's so simple, this functionality included in the loading functionality.
 - `load/` - reloading or loading data from backend after changes have been made; this component has three tasks:
   - `list.js` - loading an entire list of goals/routines (after creation or deletion)
   - `item.js` - loading a single task (after an edit has been made)
   - `new-item.js` - generating a form to create a new task

### Backend
The app's server-side is divided into _goals_ and _routines_. For each subset, there is a similar list of actions:

 - `create.php` - used by `create.js` to insert a task into the database
 - `edit.php` - used by `edit.js` to update a single column's value
 - `delete.php` - used to delete a task (woah!)
 - `list.php` - used by `load/list.js` to reload all tasks
 - `item.php` - used by `load/item.js` to reload one task

## Getting Your Hands Dirty
### Finding things to code
 - [github.com/clabe45/achievacity/issues](https://github.com/clabe45/achievacity/issues)

### Reference
 - [JavaScript reference](reference/js/index/)
 - PHP reference coming soon.

### Tutorials
Creating files for Achievacity:

 - [Creating ES6 Modules](tutorials/es6-module/)
 - [Creating PHP AJAX Files](tutorials/php-ajax/)
