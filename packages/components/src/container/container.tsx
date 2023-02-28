
import { ComponentChildren } from "preact";
import { classNames } from '@stool/dom';
// import styles from './container.css';

const styles = {
    xxl: 'container-xxl',
    xl: 'container-xl',
    lg: 'container-lg',
    md: 'container-md',
    sm: 'container-sm',
    fluid: 'container-fluid',
};

type ContainerProps = {
    xxl?: boolean,
    xl?: boolean,
    lg?: boolean,
    md?: boolean,
    sm?: boolean,
    fluid?: boolean,
    children?: ComponentChildren,
    className?: string,
};

export const Container = ({ xxl, xl, lg, md, sm, fluid, children }: ContainerProps) => {
    const cls = classNames({
        [styles.xxl]: xxl,
        [styles.xl]: xl,
        [styles.lg]: lg,
        [styles.md]: md,
        [styles.sm]: sm,
        [styles.fluid]: fluid,
    });
    return (
        <div className={cls}>
            {children}
        </div>
    );
}
