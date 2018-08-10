const path = require('path');
const webpack = require('webpack');
const is_pro = process.env.NODE_ENV === 'development';

const client = {
    entry: 'requires.js',
    output: {
        filename: 'cookie.js',
    },
    module: {
		
    }
};

module.exports = [client];