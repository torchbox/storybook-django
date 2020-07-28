import { initAccordions } from './accordion';

describe('Accordion', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <div class="accordion" data-accordion>
            <div class="accordion__panel" data-accordion-panel>
                <h3 class="accordion__title heading heading--4">
                    <button class="accordion__toggle" type="button" data-accordion-toggle aria-pressed="true" aria-expanded="true" aria-controls="test-content-0">
                        <span class="accordion__title-inner">Test title</span>
                    </button>
                </h3>
                <div id="test-content-0" class="accordion__content" data-accordion-content>
                    <p>Test description</p>
                </div>
            </div>
            <div class="accordion__panel" data-accordion-panel>
                <h3 class="accordion__title heading heading--4">
                    <button class="accordion__toggle" type="button" data-accordion-toggle aria-pressed="true" aria-expanded="true" aria-controls="test-content-1">
                        <span class="accordion__title-inner">Test title</span>
                    </button>
                </h3>
                <div id="test-content-1" class="accordion__content" data-accordion-content>
                    <p>Test description</p>
                </div>
            </div>
        </div>
        `;
    });

    it('shows the first answer by default', () => {
        initAccordions();
        expect(document.querySelector('#test-content-0').hidden).toBe(false);
        expect(document.querySelector('#test-content-1').hidden).toBe(true);
    });

    it('shows the content when the toggle is clicked', () => {
        initAccordions();

        const toggle = document.querySelector(
            '[aria-controls="test-content-1"]',
        );
        toggle.dispatchEvent(new Event('click'));
        expect(document.querySelector('#test-content-1').hidden).toBe(false);
    });

    it('hides the content when the toggle is clicked if already open', () => {
        initAccordions();

        const toggle = document.querySelector(
            '[aria-controls="test-content-1"]',
        );
        toggle.dispatchEvent(new Event('click'));
        expect(document.querySelector('#test-content-1').hidden).toBe(false);
        toggle.dispatchEvent(new Event('click'));
        expect(document.querySelector('#test-content-1').hidden).toBe(true);
    });
});
