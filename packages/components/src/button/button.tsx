import { classNames } from '@stool/dom';
import { cloneElement, VNode , Ref} from 'preact';
import { getIcon } from '../icon/icon';

const styles = {
    root: 'btn',
    variants: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        warning: 'btn-warning',
        light: 'btn-ligth',
        link: 'btn-link',
    },
    sizes: {
        small: 'btn-sm',
        large: 'btn-lg',
    },
    block: 'btn-block',
    icon: 'btn-icon',
    buttons: 'btn-group',
};

export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary',
    danger = 'danger',
    warning = 'warning',
    link = 'link',
};

export enum ButtonType {
    button = 'button',
    submit = 'submit',
    reset = 'reset'
};

export enum ButtonSize {
    small = 'small',
    large = 'large',
    default = 'default',
};

export interface ButtonProps {
    label?: VNode | string,
    primary?: boolean,
    disabled?: boolean,
    variant?: keyof typeof ButtonVariant,
    block?: boolean,
    size?: keyof typeof ButtonSize,
    icon?: VNode,
    loading?: boolean,
    className?: string,
    innerRef?: Ref<any>,
    children?: VNode | string,
}

export function Button ({
    label,
    primary,
    variant,
    size,
    block,
    icon,
    disabled,
    loading,
    className,
    innerRef,
    children,
    ...props
}: ButtonProps) {
    const cls = classNames(styles.root, {
        [styles.variants.primary]: !variant && primary,
        [styles.variants.secondary]: !variant && !primary,
        [styles.variants[variant]]: variant,
        [styles.sizes[size]]: size,
        [styles.block]: block,
    }, className);
    return (
        <button ref={innerRef} className={cls} aria-label={label} type="button" aria-disabled={disabled} disabled={disabled} {...props}>
            {icon && <span className={styles.icon}>{getIcon(icon, '16px')}</span>}
            {children && <span>{children}</span>}
        </button>
    );
};
Button.displayName = 'Button';

export function ButtonGroup({ primary, disabled, text, children }: any) {
    return (
        <div className={styles.buttons}>{children.map(child => cloneElement(child, { primary, disabled, text }))}</div>
    );
};
ButtonGroup.displayName = 'Button.Group';

Button.Group = ButtonGroup;
