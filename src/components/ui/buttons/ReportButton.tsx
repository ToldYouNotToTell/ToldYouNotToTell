import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  onClick: () => void;
}

export const ReportButton = ({ onClick }: Props) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles.reportButton}`}
    aria-label="Report"
  >
    <i className="fas fa-flag"></i>
  </button>
);

export default ReportButton;