const Encore = require('@symfony/webpack-encore');
const WorkboxPlugin = require('workbox-webpack-plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')

  .enableSingleRuntimeChunk()
  .enableReactPreset()
  .addEntry('app', './assets/pbr/js/index.jsx')
  .addEntry('vr', './assets/vr/js/index.jsx')
  .addEntry('midi', './assets/midi/js/index.jsx')
  .addStyleEntry('appStyle', './assets/pbr/css/index.css')
  .addStyleEntry('vrStyle', './assets/vr/css/index.css')
  .addStyleEntry('midiStyle', './assets/midi/css/index.css')

  .cleanupOutputBeforeBuild()

  .configureManifestPlugin((options) => {
    options.fileName = 'assets_manifest.json';
  })

  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .enablePostCssLoader((options) => {
    options.postcssOptions = {
      config: './postcss.config.js',
    };
  })

  .addPlugin(new WorkboxPlugin.GenerateSW({
    swDest: '../service-worker.js',
    inlineWorkboxRuntime: true,
  }));

module.exports = Encore.getWebpackConfig();
