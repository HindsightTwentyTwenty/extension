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
The frontend for hindsite is written in redux. 

The frontend src code is currently separated into an `app` folder which contains redux components, actions, and reducers, and a `chrome` folder which contains the `main.html` file and stylistic assets such as fonts and css. 

## Setup
Our chrome extension can be downloaded from the chrome store here: https://chrome.google.com/webstore/detail/hindsite/ophfekmjofacmldmbficnkbmhnajbmfl

## Deployment (For Local Testing) 
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
The links to the various tools we used in development of hindsite frontend can be found here:
https://github.com/HindsightTwentyTwenty/frontend/wiki/Sources
