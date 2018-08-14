const config = {
    output: {
        path: './',
        client_filename: 'client.js',
        ext_filename: 'index.js',
    },
    default_props: {
        background: null,
        port: 7031,
        onReload: function () {}
    }
};

webpack({
	config
}, callback);