# restart

A starter kit for building webapps using [react](https://facebook.github.io/react/), [redux](https://github.com/rackt/redux), [graphql](https://github.com/facebook/graphql), [webpack](https://webpack.github.io/) and [babel](https://babeljs.io/).

There are a lot of different "boilerplate" repos out there, this one is what I'm using right now.

Pros:
* Makes sense to me. Hopefully to you, too!
* Babel 6 with ES2015 and stage-0 presets
* A minimal express app too
* Webpack hot-reloading for clientside bits
* Babel setup for the server-side code as well, write modern JS everywhere.
* Pleasant nodemon watching your server code. Automatic reloading everywhere!
* Graphql and graphql-express setup out of the box

Cons:
* Not doing anything isomorphic/universal.
* `TODO` Currently not showing anything off about redux.
* Probably lots more cons?

## Usage

Clone the repo and then:

```
$ cd restart
$ rm -rf .git
$ npm install
```

Generate a secret like so:

```
$ python -c "import os; print(os.urandom(24).encode('hex'))"
```

And then stick that value in your environment as `SECRET_KEY`.

Originally, this app used passport to implement auth; all of that got ripped out for the purposes of simplification except for `src/server/middlewares/auth.js`, which contains the code for ensuring that a given view is authenticated. You're going to want to edit that file.

Run the app like:

```
$ npm start
```

And visit http://localhost:3000 to see your app live. Webpack will hot-reload on changes to clientside components; nodemon will restart upon changes to serverside bits.

Have fun!
