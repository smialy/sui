import { classNames } from '@stool/dom';
import styles from './split.css';

export const Split = ({ className, children, ...props }) => {
    const cls = classNames(className, styles.root);
    return (
        <div className={cls} {...props}>
            {children}
        </div>
    );
};

const Item = ({ filled, className, children, ...props }) => {
    const cls = classNames(className, styles.item, {
        [styles.filled]: filled,
    });
    return (
        <div className={cls} {...props}>
            {children}
        </div>
    );
};

Item.displayName = 'Split.Item';
Split.Item = Item;