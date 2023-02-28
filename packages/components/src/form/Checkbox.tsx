import { classNames } from '@stool/dom'
import { useFormField } from './useForm';

export function FormCheckbox({ label, ...props }) {
    const { field, meta } = useFormField({ type: 'checkbox', ...props });
    const { error } = meta;
    const cls = classNames('form-group', {
        invalid: !!error,
    });
    const id = `checkbox-${field.name}`;
    return (
        <div class={cls}>
            <div class="form-controls">
                <input id={id} type="checkbox" {...field} />
                <label for={id}>
                    {label}
                    {field.required && <em>*</em>}
                </label>
                {error && <span class="invalid-message">{error}</span>}
            </div>
        </div>
    );
}
