# hindsite
hindsite is a Chrome extension which helps users track and categorize their browser sessions as they traverse the web. 
![Alt text](https://cloud.githubusercontent.com/assets/19778184/19412012/50a66544-92da-11e6-9ec0-5fd46331e4d2.png)
![Alt text](https://cloud.githubusercontent.com/assets/19778184/19411644/68742cda-92d3-11e6-98d5-5f456220b73a.png)
![Alt text](https://cloud.githubusercontent.com/assets/19778184/19411643/67895930-92d3-11e6-97f7-607ad7febc9e.png)
![Alt text](https://cloud.githubusercontent.com/assets/19778184/19411641/6468ed2e-92d3-11e6-99b3-30f998979596.png)
![Alt text](https://cloud.githubusercontent.com/assets/19778184/19411642/6671f0de-92d3-11e6-9652-75a382a8cb34.png)

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
run `npm run dev`

## Authors
* Wanda Czerwinski
* Shelley Garg
* Tommy Kiernan
* Grace Miller
* Zachary Tannenbaum

## Acknowledgments
