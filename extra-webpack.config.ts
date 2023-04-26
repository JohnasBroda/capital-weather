import * as NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';

export default {
    plugins: [
        new NodePolyfillPlugin(),
        new DefinePlugin({
            'process.env.NODE_DEBUG': JSON.stringify(process.env['NODE_DEBUG'])
        })
    ],
    resolve: {
        fallback: {
            fs: false,
            net: false,
            http: false,
            process: false,
            async_hooks: false,
            global: false,
        }
    }
} as Configuration;
