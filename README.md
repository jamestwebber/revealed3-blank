# revealed3-blank
A blank template for a reveal.js presentation with d3 support, plus some useful scripts. This is very much a work in progress and will be continuously hacked at as I add ever-more-frivolous animations to my presentations, and change the old stuff. I mostly just keep generic d3 scripts in this repository--customizations to reveal.js go in a fork of that project.

I make no promises about maintaining backwards compatibility or adding particular features (PRs and suggestions are still welcome). I'm only targeting my own development environment, which is OS X. I believe everything should work out of the box on Linux though.

## Requirements
You'll need to clone [reveal.js](https://github.com/hakimel/reveal.js) somewhere and modify `setup.sh` to point to it. You'll also need the various requirements for reveal.js ([Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/getting-started#installing-the-cli), etc).

## Usage
To make a presentation, clone this project into a new folder and run `source setup.sh` to create symbolic links to the reveal.js installation. Then, modify index.html to create your presentation.

### Connecting Slide Fragments to d3
If you want to trigger d3 transitions (or any Javascript) using reveal fragments, you should load `reveal-to-d3.js` in your `index.html` file. That script defines an object `pt.slideIdToFunctions`. For each slide that contains JS fragments, add an object to describe those fragments, using the slide ID as the key. The fragment functions should be indexed in order:

```javascript
pt.slideIdToFunctions['example-slide-id'] = {
  '-1': function () {
    // initialization javascript goes here (will be called when slide is reached)
  },
  0: function () {
    // first fragment action goes here...
  },
  1: function () {
    // second fragment action goes here...
  },
};
```

To trigger these functions you will need to add fragments to your slide. You can do this with something like
```html
<span class="fragment"></span>
```

## Acknowledgements
I'm putting this up here in case others find it useful, but the overwhelming majority of the credit is due to [Hakim El Hattab](https://github.com/hakimel) for building [reveal.js](https://github.com/hakimel/reveal.js), and to [Mike Bostock](https://github.com/mbostock) for [d3](https://github.com/mbostock/d3). Additional kudos to [Pablo Tamarit](https://github.com/ptamarit) who wrote the [original code](https://github.com/ptamarit/slides-data-viz-web-d3) that connected the two projects.
