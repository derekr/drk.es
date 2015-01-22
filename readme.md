#drk.es [![Build Status](https://travis-ci.org/derekr/drk.es.svg?branch=master)](https://travis-ci.org/derekr/drk.es)

My homestead.

## Usage

This site is using [Metalsmith](), a static site generator.
Chosen for it's barebones interface and decent library of
plugins around generating a static site.

The build pipeline is declared in [/lib/metalsmith.js](/lib/metalsmith.js). Which is used in
[/index.js](/index.js) which executes the build and [/watch.js](/watch.js) which runs an initial build want watches for file changes which trigger subsequent builds automatically using [metalsmith-simplewatch][simplewatch];

scipts:

```
npm run build // builds site
npm run watch // builds site and watches for changes
```

## Pipeline

Metalsmith allows you to setup a pipeline of transformations over
a set of files. Each transformation to the set is reflected in
the next step. Meaning if you change the path of a file or add an attribute in `step1` you'll see those changes in `step2`.

### publish

[metalsmith-publish][publish]

Allows setting a `draft` state in article frontmatter for articles that aren't ready
to be published and will filter them out from being included in
the resulting build.

```
---
title: ¯\_(ツ)_/¯
publish: draft
---

This won't be included in the `build` directory.
```

### metadata

[metalsmith-metadata][metadata]

Allows defining a global set of data that can be referenced within
the pipeline and template rendering. Useful for things defaults and
configuration.

### collections

[metalsmith-collections][collections]

Based on a pattern I can group sets of files under named collections which can be referenced in the pipeline for performing more granular  
transformations.

### markdown

[metalsmith-markdown][markdown]

Parses all `*.md` files in the set and renders them as html. This
step uses marked under the hood and has support for github flavored
markdown as well as parsing code samples for syntax highlighting using pygment.

### permalinks

[metalsmith-permalinks][permalinks]

Appends a `path` attribute to the set. The attribute contains the relative path to the resulting output file which makes building
links easier. It also has support for moving files to create more human friendly urls: `articles/something.html => articles/something/index.html`. I utilize this structure in `/src` already incase I want to include custom css or js for an article.

### article-index

[/lib/metalsmith-article-index.js](/lib/metalsmith-article-index.js)

A custom plugin that will create an index of all articles at `/articles`. Eventually plan to open source this as a legit plugin
with support for custom template rendering.

### less

[metalsmith-less][less]

Compiles all `*.less` files to `*.css`.

### ignore

[metalsmith-ignore][ignore]

Simplest way of removing `.less` files from resulting build.

### layout

[/lib/metalsmith-layout.js](/lib/metalsmith-layout.js)

Custom plugin that wraps all parsed `*.html` files and wraps them
in a base template [/lib/templates/layout.html](/lib/templates/layout.html). Provides
custom logic for pre-rendering collections with a particular template (such as articles being wrapped in an `article` tag).

## License

Code released under MIT.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

I think this is correct? Basically run wild with the code that
builds the site and used for clientside scripting, but the
content under `/src` is under CC.

[metalsmith]: http://www.metalsmith.io (Metalsmith)
[simplewatch]: https://github.com/christophercliff/metalsmith-simplewatch (metalsmith-simplewatch)
[publish]: https://github.com/mikestopcontinues/metalsmith-publish (metalsmith-publish)
[metadata]: https://github.com/segmentio/metalsmith-metadata/blob/master/package.json (metalsmith-metadata)
[collections]: https://github.com/segmentio/metalsmith-collections (metalsmith-collections)
[markdown]: https://github.com/segmentio/metalsmith-markdown (metalsmith-markdown)
[permalinks]: https://github.com/segmentio/metalsmith-permalinks (metalsmith-permalinks)
[less]: https://github.com/christophercliff/metalsmith-less (metalsmith-less)
[ignore]: https://github.com/segmentio/metalsmith-ignore (metalsmith-ignore)
