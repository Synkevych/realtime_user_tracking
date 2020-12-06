[![HitCounts](http://hits.dwyl.io/Synkevych/realtime_user_tracking.svg)](http://hits.dwyl.io/Synkevych/realtime_user_tracking)
[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge&style=flat)](https://count-online-users.herokuapp.com)
[![react](https://github.com/aleen42/badges/blob/master/src/react.svg)](https://aleen42.github.io/badges/src/react.svg)
[![router](https://github.com/aleen42/badges/blob/master/src/router.svg)](https://aleen42.github.io/badges/src/router.svg)
<h1 align="center"> Count Online Users </h1>
<p align="center">
  Count Online Users - tracks whether a user is online or not(has opened webpage in browser), showing a green button "Online" at the user card and changes the users counter at the subheader. Built with RoR and React framework, deployed to Heroku.

  <img src="public/index.png">
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting started](#getting-started)
- [Feedback](#feedback)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

This project only shows the current online user on the home page. This is useful for creating presence features like showing a green dot next to a user name if they're online. Based on RailsGuide - ActionCable Example 1: [User Appearances](https://guides.rubyonrails.org/action_cable_overview.html#example-1-user-appearances)
To do that, it create each user automatically by unique ip address and type of device. To tracks users used **Rails Action Cable** with **Redis** and **WebSocket** technology. For fronted - used **React**.

How it works with Action Cable(works strangely because of cookies):
![demo](public/demo.gif)

The user ID is stored in cookies, so if you just change the device type in the browser, the change does not occur, you also need to clear the cookies. Better for testing to open one tab in incognito mode.

## Features

Main tasks:

* Create a service that counts users which opened current page of website
* Display counter for all users on the same page
* The user should be created/find automatically according to the request parameters(ip,devise)
* REST API
* React for rendering Frontend part

Deployed to Heroku and available [online](https://count-online-users.herokuapp.com/). It used **redistogo** Heroku addons to automatic setup and run Redis server.

## Getting started

##### Prerequisites

The setups steps expect following tools installed on the system.

- Github
- Ruby [2.6.3](https://www.ruby-lang.org/en/news/2019/04/17/ruby-2-6-3-released/)
- Rails [5.2.4.4](https://weblog.rubyonrails.org/2020/5/18/Rails-5-2-4-3-and-6-0-3-1-have-been-released/)
- PostgreSQL >= 9.3

##### 1. Check out the repository

```bash
git clone https://github.com/Synkevych/realtime_user_tracking
cd realtime_user_tracking
```

##### 2. Create database.yml file

By default this repo create database `count_online_users_development`, edit the database configuration as required and provide correct username and password from your PostgreSQL.

##### 3. Create and setup the database, bundle and yarn

Run the following commands to create and setup the database and all required libraries.

```ruby
rails db:create
rails db:setup
rails db:migrate
rails db:seed # create 3 default user on database

bundle install

yarn install
```

##### 4. Start the Rails server

You can start the rails server using the command: `rails s`.

And now you can visit the site with the URL http://localhost:3000

##### 5. Deployment to Heroku instructions

Here is instruction how to deploy this app to Heroku:

`heroku login` - login to your profile  
`heroku create count-online-users` - create new heroku app with specific name  
`heroku addons:add redistogo` - this addons create redis server
`heroku config --app count-online-users | grep REDISTOGO_URL` - this command show you unique url to your redis server on heroku, copy them and past on `config/cable.yml`

```yml
production:
  adapter: redis
  url: redis://redistogo:36185658a31da3b45b9485ad5087016a@soat.redistogo.com:10775/
```

Then add configuration to the config/environments/production.rb

```ruby
Rails.application.configure do
...
  # Configuration for Action Cable and WebSockets
  config..web_socket_server_url = "wss://count-online-users.herokuapp.com/cable"

  # Allowed Request Origin 
  config.action_cable.allowed_request_origins = ['https://count-online-users.herokuapp.com', 'http://count-online-users.herokuapp.com']
end
```

`git add -A; git commit -m "update redis conf"` - commit changes
`git push heroku master` - push you project to Heroku server  
`heroku run rake db:migrate` - run migration on Heroku server  
`heroku pg:reset` - drop database on Heroku server  
`heroku open` - open and test your website  

##### 6. Other useful commands

`rails new count_online_users --webpack=react --database=postgresql -T` - create a new app with React and PostgreSQL  
`rails g model User name:string ip_address:string device:string visits:integer online:boolean`  
`rails db:setup`  
`rails g serializer User name ip_address device, emoji, last_seen_at, visits, online`  
`rails g channel Activity`  
`yarn add react-router-dom`  
`yarn add axios`  
`yarn add styled-components`  
`git checkout redis_for_heroku -- config/cable.yml ` - get changes from specific files from another branch
`git merge --squash fix_updating_when_user_returned` - squash all changes from a branch to the master

## Feedback

Feel free to send us feedback on [Twitter](https://twitter.com/synkevych) or [file an issue](https://github.com/Synkevych/realtime_user_tracking/issues/new). Feature requests are always welcome.
