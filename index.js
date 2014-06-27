var detective = require('detective')
var map       = require('map-limit')
var resolve   = require('resolve')
var path      = require('path')
var once      = require('once')
var fs        = require('fs')

module.exports = backtrack

function backtrack(entry, target, done) {
  var parents = []
  var checked = {}
  var pending = 0
  var queue = []
  var error

  entry  = path.resolve(entry)
  target = path.resolve(target)
  done = once(done)

  check(entry)

  function check(file) {
    if (checked[file]) return checkNext()

    checked[file] = true
    pending += 1

    fs.readFile(file, 'utf8', function(err, content) {
      if (err) return done(err)

      map(detective(content), 5, function(child, next) {
        resolve(child, {
          basedir: path.dirname(file)
        }, function(err, resolved) {
          if (err) error = err
          return next(null, resolved !== child && resolved)
        })
      }, function(err, files) {
        files = files.filter(Boolean)
        queue.push.apply(queue, files)

        for (var i = 0; i < files.length; i++) {
          if (files[i] !== target) continue
          if (parents.indexOf(file) !== -1) continue
          parents.push(file)
        }

        pending -= 1
        checkNext()
      })
    })
  }

  function checkNext() {
    while (pending < 10 && queue.length)
      check(queue.pop())

    if (!queue.length && !pending)
      return done(error || null, parents)
  }
}
