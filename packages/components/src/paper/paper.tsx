import { classNames } from '@stool/dom';
import styles from './paper.css';

export const Paper = ({ children, className }) => (
    <div className={classNames(styles.root, className)}>
        {children}
    </div>
);
Paper.displayName = 'Paper';
