import React from 'react';

const THEMES = {
  centre: 'loading-indicator loading-indicator--centre',
  left: 'loading-indicator loading-indicator--left',
} as const;
type Theme = keyof typeof THEMES;
export const INDICATOR_THEMES = Object.keys(THEMES);

interface LoadingIndicatorProps {
  children: JSX.Element;
  theme?: Theme;
  className?: string;
}

/**
 * This component uses markup generated from https://loading.io
 */
const LoadingIndicator = ({
  children,
  theme = 'centre',
  className,
}: LoadingIndicatorProps) => {
  const indicatorClassName = `${THEMES[theme]} ${className || ''}`;

  return (
    <div className={indicatorClassName}>
      <div className="loading-indicator__animation" aria-hidden="true">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="loading-indicator__content">
        <h2 className="loading-indicator__heading">Please wait one moment</h2>
        <p className="loading-indicator__message">{children}</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
