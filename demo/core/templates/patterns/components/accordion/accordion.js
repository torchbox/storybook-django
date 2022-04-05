class Accordion {
  static selector() {
    return '[data-accordion]';
  }

  /**
   * @param {HTMLDivElement} node
   */
  constructor(node) {
    /** @type {HTMLDivElement[]} */
    const panels = [...node.querySelectorAll('[data-accordion-panel]')];

    panels.forEach((panel, i) => {
      const isFirst = i === 0;

      /** @type {HTMLButtonElement[]} */
      const toggle = panel.querySelector('[data-accordion-toggle]');
      /** @type {HTMLDivElement[]} */
      const content = panel.querySelector('[data-accordion-content]');

      if (!toggle || !content) {
        return;
      }

      toggle.addEventListener('click', () => {
        const wasOpen = toggle.getAttribute('aria-pressed') === 'true';
        const isOpen = !wasOpen;

        toggle.setAttribute('aria-pressed', `${isOpen}`);
        toggle.setAttribute('aria-expanded', `${isOpen}`);
        content.hidden = !isOpen;
      });

      // All panels are open by default. When JS kicks in, the first panel stays open,
      // other panels are closed.
      if (isFirst) {
        toggle.setAttribute('aria-pressed', 'true');
        toggle.setAttribute('aria-expanded', 'true');
        content.hidden = false;
      } else {
        toggle.setAttribute('aria-pressed', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        content.hidden = true;
      }
    });
  }
}

export default Accordion;

export const initAccordions = () => {
  /** @type {HTMLDivElement[]} */
  const accordions = [...document.querySelectorAll('[data-accordion]')];
  return accordions.map((accordion) => new Accordion(accordion));
};
