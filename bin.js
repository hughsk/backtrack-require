#!/usr/bin/env node

var path      = require('path')
var backtrack = require('./')
var fs        = require('fs')

var entry  = process.argv[2]
var target = process.argv[3]
var cwd    = process.cwd()

if (!entry) return usage()
if (!target) return usage()

backtrack(entry, target, function(err, files) {
  if (err) throw err


  console.log(files.map(function(file) {
    return path.relative(cwd, file)
  }).join('\n'))
})
