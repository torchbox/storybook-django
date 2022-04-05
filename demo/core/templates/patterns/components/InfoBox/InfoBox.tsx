import React from 'react';

import Icon, { IconName } from '../icon/Icon';
import Button from '../button/Button';

const THEMES = {
  default: 'info-box info-box--default',
  checkmark: 'info-box info-box--checkmark',
} as const;
type Theme = keyof typeof THEMES;

const THEME_ICONS: { [key in Theme]: IconName } = {
  default: 'information',
  checkmark: 'checkmark',
};

export const INFOBOX_THEMES = Object.keys(THEMES);

interface InfoBoxProps {
  children: React.ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
  ctaHref?: string;
  theme?: Theme;
  className?: string;
}

/**
 * A wrapper for arbitrary rich text content, usually displayed in a sidebar.
 * Can optionally have a call to action link at the bottom.
 */
const InfoBox = ({
  children,
  ctaLabel,
  ctaTo,
  ctaHref,
  theme = 'default',
  className,
}: InfoBoxProps) => {
  const infoBoxClassName = `${THEMES[theme]} ${className || ''}`;
  const iconName = THEME_ICONS[theme];

  return (
    <aside className={infoBoxClassName}>
      <Icon name={iconName} className="info-box__icon" />
      {children}
      {ctaLabel ? (
        <div className="info-box__cta">
          <Button
            iconAfter="chevron-right"
            to={ctaTo}
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
          >
            {ctaLabel}
          </Button>
        </div>
      ) : null}
    </aside>
  );
};

export default InfoBox;
