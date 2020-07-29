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
