const { load, exec, concurrent, serial } = require('@xarc/run');

load({
  build: exec('nx build', {
    tty: true,
  }),
  clean: ['clean:cache', 'clean:dist'],
  'clean:dist': exec('rm -rf dist', { tty: true }),
  'clean:cache': exec('rm -rf nx-cache', {
    tty: true,
  }),
  dev: exec('nx serve', {
    tty: true,
  }),
  'generate:gql': exec('nx run-many --target=generate:gql --all', {
    tty: true,
  }),
  lint: ['nx:format:write', 'nx:lint'],
  'lint-staged': exec('lint-staged', {
    tty: true,
  }),
  'nx:e2e': exec('nx run-many --target=e2e --all', {
    tty: true,
  }),
  'nx:format:check': exec('nx format:check', {
    tty: true,
  }),
  'nx:format:write': exec('nx format --write', {
    tty: true,
  }),
  'nx:lint': exec('nx run-many --target=lint --all', {
    tty: true,
  }),
  'nx:test': exec('nx run-many --target=test --all', {
    tty: true,
  }),
  'pre-commit': ['lint-staged', 'lint'],
  'site:prod:run': [
    'build',
    exec('nx run site:serve:production', {
      tty: true,
    }),
  ],
  test: ['build', 'lint', 'nx:test', 'nx:e2e', 'nx:format:check'],
});
