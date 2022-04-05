export const ICONS = [
  'close',
  'cancel',
  'arrow',
  'microphone-on',
  'microphone-off',
  'phone',
  'fullscreen-enter',
  'fullscreen-exit',
  'off-site',
  'arrows',
  'information',
  'search',
  'arrow-right',
  'chevron-down',
  'chevron-right',
  'profile-avatar',
  'checkmark',
] as const;

export type IconName = typeof ICONS[number];

/**
 * Accessible icon component, built with <use> references to an inline SVG symbols sprite.
 */
const Icon = ({ name, className }: { name: IconName; className?: string }) => (
  <svg className={`icon icon--${name} ${className || ''}`} aria-hidden="true">
    <use href={`#${name}`} />
  </svg>
);

export default Icon;
