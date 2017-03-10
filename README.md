# hindsite
hindsite is a Chrome extension which helps users track, categorize, and search their browser sessions as they traverse the web. 
visit our website, or visit our wiki, to learn more about downloading and using the app:
www.hindsitehistory.com

##Coding Practices
* use camelCase for function names
* use underscore_case for variable names

##Weekly Schedule
* Tuesday --> Sunday: make new features
* Sunday --> Monday: testing and bug fixes
* Monday --> Tuesday: push to master, create plan for the coming week's features

##git flow
* three branches: master, staging, develop
* create branches off of develop with "initials/githubIssueNumber"
* when submitting the pull request comment "[ref#31] shortdescription"
* one person must review your pull request before merging

## Architecture

The frontend src code is currently separated into an `app` folder which contains redux components, actions, and reducers, and a `chrome` folder which contains the `main.html` file and stylistic assets such as fonts and css. 

## Setup

We are currently only locally developing our extension. However, there will soon be a version of our app available as a chrome extension for beta testing. 

## Deployment (For Local Testing) 

start the backend server using the virtual env (detailed in the readme of the backend)
open a new tab in terminal and go to the frontend directory
run `npm install` if opening the app for the first time
run `npm run dev`

## Authors
* Wanda Czerwinski
* Shelley Garg
* Tommy Kiernan
* Grace Miller
* Zachary Tannenbaum

## Acknowledgments
