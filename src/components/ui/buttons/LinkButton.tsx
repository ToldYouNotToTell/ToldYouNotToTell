import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export const LinkButton = ({ href, children, external = false }: Props) => (
  <a
    href={href}
    className={`${styles.button} ${styles.linkButton}`}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
  >
    {children}
  </a>
);

export default LinkButton;