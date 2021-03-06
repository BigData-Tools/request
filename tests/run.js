var spawn = require('child_process').spawn
  , exitCode = 0
  , timeout = 10000
  ;

var tests = [
    'test-basic-auth.js'
  , 'test-body.js'
  , 'test-cookie.js'
  , 'test-cookiejar.js'
  , 'test-defaults.js'
  , 'test-digest-auth.js'
  , 'test-errors.js'
  , 'test-form.js'
  , 'test-follow-all-303.js'
  , 'test-follow-all.js'
  , 'test-headers.js'
  , 'test-httpModule.js'
  , 'test-https.js'
  , 'test-https-strict.js'
  , 'test-oauth.js'
  , 'test-params.js'
  , 'test-pipes.js'
  , 'test-pool.js'
  , 'test-protocol-changing-redirect.js'
  , 'test-proxy.js'
  , 'test-piped-redirect.js'
  , 'test-qs.js'
  , 'test-redirect.js'
  , 'test-timeout.js'
  , 'test-toJSON.js'
  , 'test-tunnel.js'
]

var next = function () {
  if (tests.length === 0) process.exit(exitCode);

  var file = tests.shift()
  console.log(file)
  var proc = spawn('node', [ 'tests/' + file ])

  var killed = false
  var t = setTimeout(function () {
    proc.kill()
    exitCode += 1
    console.error(file + ' timeout')
    killed = true
  }, timeout)

  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)
  proc.on('exit', function (code) {
    if (code && !killed) console.error(file + ' failed')
    exitCode += code || 0
    clearTimeout(t)
    next()
  })
}
next()
