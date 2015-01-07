# Multiple View Folders for ExpressJS

This module is an addon for ExpressJS 3.x that allows multiple view folders to be defined.

## Install

```bash
npm install https://github.com/jghowe/express-multiple-views/archive/master.tar.gz
```

## Usage

To use, setup your default view path and then add additional view paths as necessary.

```javascript

var path = require('path'),
	app = require('express')(),
	multipleViews = require('express-multiple-views');

app.set('views', path.join(__dirname, 'views'));

multipleViews(app, path.join(__dirname, 'module1/views'));
multipleViews(app, path.join(__dirname, 'module2/views'));
/* ... */

```
