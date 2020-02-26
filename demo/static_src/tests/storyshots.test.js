import initStoryshots from '@storybook/addon-storyshots';
import { mount } from 'enzyme';

initStoryshots({
    suite: 'Storyshots smoke tests',
    configPath: __dirname,
    test: ({ story }) => {
        const storyElement = story.render();
        mount(storyElement);
    },
});
