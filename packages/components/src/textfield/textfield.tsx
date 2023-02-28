import { useCallback, useRef, useState, useEffect, useLayoutEffect } from 'preact/hooks';
import { classNames } from '@stool/dom';
// import styles from './textfield.css';

const styles = {
    root: 'mb-3',
    input: 'form-control',
    label: 'form-label',
    help: 'form-text',
    disabled: 'disabled',
    focused: 'focuses',
    filled: 'filled',
    valid: 'is-valid',
    invalid: 'is-invalid',
    validHelp: 'valid-feedback',
    invalidHelp: 'invalid-feedback',
}

const isFilled = (el) => el && el.value != null && el.value !== '';

export const TextField = ({
    label,
    disabled,
    readonly,
    required,
    help,
    type,
    value,
    invalid,
    valid,
    placeholder,
    className,
    innerRef,
    onBlur,
    onFocus,
    onChange,
    ...props
}: any) => {
    const { current: isControlled } = useRef(value != null);
    const inputRef = innerRef || useRef();
    const [focused, setFocused] = useState(false);

    const handleFocus = (event) => {
        if (onFocus) {
          onFocus(event);
        }
        setFocused(true);
      };

    const handleBlur = (event) => {
        if (onBlur) {
            onBlur(event);
        }
        setFocused(false);
    };

    const handleChange = (event, ...args) => {
        if (!isControlled) {
          const element = event.target || inputRef.current;
          checkDirty(element);
        }

        if (onChange) {
          onChange(event, ...args);
        }
      };


    const [filled, setFilled] = useState(() => {
        let initialFilled = false;

        if (isFilled(inputRef.current)) {
            initialFilled = true;
        }
        return initialFilled;
    });
    const onFilled = useCallback(() => {
        setFilled(true);
      }, []);

      const onEmpty = useCallback(() => {
        setFilled(false);
      }, []);

      const checkDirty = useCallback((obj) => {
        if (isFilled(obj)) {
            if (onFilled) {
                onFilled();
            }
        } else if (onEmpty) {
            onEmpty();
        }
    }, [onFilled, onEmpty]);

    useLayoutEffect(() => {
        if (isControlled) {
          checkDirty({ value });
        }
    }, [value, checkDirty, isControlled]);

    useEffect(() => {
        checkDirty(inputRef.current);
    }, []);

    const cls = classNames(styles.root, {
        [styles.disabled]: disabled,
        [styles.focused]: focused,
        [styles.filled]: filled || placeholder,

    }, className);
    const inputCls = classNames(styles.input, {
        [styles.valid]: valid,
        [styles.invalid]: invalid,
    });
    const helpCls = classNames(styles.help, {
        [styles.validHelp]: valid,
        [styles.invalidHelp]: invalid,
    });

    return (
        <div className={cls}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span>*</span>}
                </label>
            )}
            <input
                className={inputCls}
                type={type || 'text'}
                value={value}
                ref={inputRef}
                aria-label={label}
                disabled={disabled}
                readonly={readonly}
                placeholder={placeholder}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                {...props}
            />
            {help && (<div className={helpCls}>{help}</div>)}
        </div>
    );
};
TextField.displayName = 'FextField';
