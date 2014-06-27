# backtrack-require [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Given an entry file and a target file, track down any files that are requiring the target file.

[![NPM](https://nodei.co/npm/backtrack-require.png)](https://nodei.co/npm/backtrack-require/)

## CLI Usage

```
Usage: backtrack-require <entry> <target>

Find every file that is requiring `target`, given an
`entry` file.
```

For example:

``` bash
$ backtrack-require fixtures/a.js fixtures/c.js
fixtures/b.js
fixtures/d.js
```

## Module Usage

### backtrack(entry, target, done(err, results))

Given an `entry` and a `target` file, call the `done` callback with an array
of files that are requiring `target`.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/backtrack-require/blob/master/LICENSE.md) for details.
