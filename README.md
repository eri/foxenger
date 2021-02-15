<p align="center"><img src="https://i.imgur.com/6zZqxVh.png"></p>

<h1 align="center">Foxenger</h1>
<h4 align="center">Local chat prototype made with Python Flask.</h4>

## What's this?
Foxenger is a (work in progress) small school project, made with Flask and using some Javascript and Ajax.
The main feature of this project is to create a small chatting application where an user can log in and start chatting under some username.

The project isn't meant to be secure (no password & data encryption, etc) or efficient in terms of performance as it's not the first goal of the project.
With this small project (as a Python dev), I'm starting to learn some javascript in order to improve my skills.

## What are you using to make this work?
Here is basically how the application work:
* **No (real) database.** Everything is storred for now in a json file, which is enough for this project.
* **Ajax.** Messages are fetched every few seconds with an Ajax request to the web server.
* **Javascript.** Elements are being updated with some Javascript to avoid any page refresh.

## Is this going to be a serious project?
For now, no. However, this school project is still ongoing and it's really fun to work on it! I will try to push some updates whenever I have time. Here is a list of a few things that I would like to do:

- [ ] Use a real database (possibly MongoDB) instead of json files
- [ ] Move helper functions from core and import them as module
- [ ] Remove duplicate Flask routes and improve their names
- [ ] Improve the UI design by using Tailwind CSS
- [ ] Replace remaining HTTP requests with Ajax
- [ ] Possibly use websockets instead of checking with setInterval()

## Can I see how it looks like?
Not yet! The project itself has multiple vulnerabilities and publishing a live version may create some issues. Once it will be publicly accessible, the link will be added here.
