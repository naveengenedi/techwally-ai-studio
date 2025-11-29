import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant, href, children, className, ...props }) => {
  const { themeSettings } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const styles = themeSettings.buttons[variant];

  const buttonStyle: React.CSSProperties = {
    backgroundColor: isHovered ? styles.hoverBackgroundColor : styles.backgroundColor,
    color: styles.textColor,
    borderRadius: styles.borderRadius,
    padding: `${styles.paddingY} ${styles.paddingX}`,
    fontWeight: 'bold',
    transition: 'all 0.2s ease-in-out',
  };

  const baseClasses = "inline-flex items-center justify-center gap-2";
  const combinedClassName = `${baseClasses} ${className || ''}`;

  const commonProps = {
    style: buttonStyle,
    className: combinedClassName,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    return (
      <Link to={href} {...commonProps}>
        {children}
      </Link>
    );
  }

  return (
    <button {...commonProps} {...props}>
      {children}
    </button>
  );
};