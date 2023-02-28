import { classNames } from '@stool/dom';
import styles from './bullseye.css';

export const Bullseye = ({ className, children, ...props }) => {
    const cls = classNames(className, styles.root);
    return (
        <div className={cls} {...props}>
            {children}
        </div>
    );
};