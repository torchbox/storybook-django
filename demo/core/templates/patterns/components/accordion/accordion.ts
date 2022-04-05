class Accordion {
  static selector() {
    return '[data-accordion]';
  }

  constructor(node: HTMLDivElement) {
    const panels = [
      ...node.querySelectorAll<HTMLDivElement>('[data-accordion-panel]'),
    ];

    panels.forEach((panel, i) => {
      const isFirst = i === 0;

      const toggle = panel.querySelector<HTMLButtonElement>(
        '[data-accordion-toggle]',
      );
      const content = panel.querySelector<HTMLDivElement>(
        '[data-accordion-content]',
      );

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
  const accordions = [
    ...document.querySelectorAll<HTMLDivElement>('[data-accordion]'),
  ];
  return accordions.map((accordion) => new Accordion(accordion));
};
