switch (process.env.APP_ENV) {
    case 'development': {
        module.exports = require('./dev');
        break;
    }

    case 'staging': {
        module.exports = require('./staging');
        break;
    }

    case 'production': {
        module.exports = require('./production');
        break;
    }

    default: {
        module.exports = require('./dev');
        break;
    }
}
