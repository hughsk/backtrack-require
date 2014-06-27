var test      = require('tape')
var backtrack = require('./')

test('basic', function(t) {
  backtrack(__filename, require.resolve('tape'), function(err, results) {
    if (err) return t.fail(err)
    t.deepEqual([__filename], results)
    t.end()
  })
})

test('nested', function(t) {
  var a = require.resolve('./fixtures/a.js')
  var b = require.resolve('./fixtures/b.js')
  var c = require.resolve('./fixtures/c.js')
  var d = require.resolve('./fixtures/d.js')

  backtrack(a, c, function(err, results) {
    if (err) return t.fail(err)
    t.deepEqual([b, d].sort(), results.sort())
    t.end()
  })
})
