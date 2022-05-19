module.exports = {
  '*.{js,jsx,ts,tsx}': (files) => {
    return [
      `nx format:write --files=${files.join(',')}`,
      `eslint --fix --ext .js --ext .ts --ext .tsx --ext .jsx ${
        files.length < 10 ? files.join(' ') : '.'
      }`,
      `git add ${files.join(' ')}`,
    ];
  },
  '*.json': (files) => {
    return [
      'sort-package-json',
      `nx format:write --files=${files.join(',')}`,
      `git add ${files.join(' ')}`,
    ];
  },
};
