const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const is_pro = process.env.NODE_ENV === 'development';
const client = {
    entry: './extension-files/',
    output: {
		//Not able to use './../../' or any variants here.
		//Webpack issue
		path: '/extension-files/',
        filename: 'requires.js'
    },
	mode: 'development'
};
module.exports = [client];