import React from 'react';
import styles from '../../styles/layout.module.css';

function Layout({ children }): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}

export default Layout;
