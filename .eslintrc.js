module.exports = {
  root: true,
  'plugins': ['vuejs-accessibility'], // add the plugin
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
    'plugin:vue/vue3-essential',
  ],
}
