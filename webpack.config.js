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
    .enableSassLoader()
    .addEntry('app', './assets/pbr/js/index.js')
    .addEntry('vr', './assets/vr/js/index.js')

    .copyFiles({
        from: './assets/vr/models',
        to: 'models/[path][name].[ext]',
    })

    .cleanupOutputBeforeBuild()

    .configureManifestPlugin((options) => {
        options.fileName = 'assets_manifest.json';
    })

    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .addPlugin(new WorkboxPlugin.GenerateSW({
        swDest: '../service-worker.js',
        inlineWorkboxRuntime: true,
    }));

module.exports = Encore.getWebpackConfig();
