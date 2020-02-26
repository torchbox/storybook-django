// Set by Webpack during the build.
global.__webpack_hash__ = '13b43433ad2a439d00b2';

// Set by Webpack during the Storybook build.
global.STORYBOOK_SVG_ICONS = '';

// Mock method not implemented by jsdom.
window.matchMedia = jest.fn(() => ({
    matches: true,
}));

// Mock method not implemented by jsdom.
window.prompt = jest.fn(() => 'test');

// Override console.error to fail tests if receiving a prop-types or key error.
const consoleError = console.error;
console.error = jest.fn((message, ...args) => {
    if (
        /(Invalid prop|Failed prop type|Encountered two children with the same key)/gi.test(
            message,
        )
    ) {
        throw new Error(message);
    }

    consoleError.apply(console, [message, ...args]);
});

// Mock method not implemented by jsdom.
navigator.mediaDevices = {
    getUserMedia: () =>
        new Promise(
            () => {},
            () => {},
        ),
};

// Mock location object not implemented by jsdom.
delete global.window.location;
global.window = Object.create(window);
global.window.location = {
    port: '8000',
    protocol: 'http:',
    hostname: 'localhost',
    pathname: 'test',
    reload: jest.fn(),
};
