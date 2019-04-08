const combine = require('istanbul-combine');

const opts = {
  dir: 'coverage',                            // output directory for combined report(s)
  pattern: 'coverage/**/coverage-final.json', // json reports to be combined
  print: 'summary',                           // print to the console (summary, detail, both, none)
  base: 'sources',                            // base directory for resolving absolute paths, see karma bug
  reporters: {
    html: {},
    cobertura: {}
  }
};

combine.sync(opts);
