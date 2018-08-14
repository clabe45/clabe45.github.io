# Creating an ES6 Module for Achievacity
## Intro
Every JavaScript module should have...

 - an `init` function, which can be called in `app/js/index.js`.
 - very good [jsdoc](http://usejsdoc.org) documentation, usually in the comments. That must include a [`@module`](http://usejsdoc.org/tags-module.html) tag in the beginning of the file, and appropriate tags for the contents of the file.

## Example
```
/**
 * Foos the world up a little.
 * @module foo-world
 */

import foo from './util/foo.js';

export default function fooWorld(world) {
    foo(world);
}
```

## Things to Consider
 - Is (or will) this be common functionality? Consider putting it in `app/js/util/`.
