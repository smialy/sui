import { classNames } from '@stool/dom';
import { useFormField } from './useForm';

export function FormSelect({ label, options, ...props }) {
    const { field, meta } = useFormField(props);
    const { error, value } = meta;
    const cls = classNames('form-group', {
        invalid: !!error,
    });
    return (
        <div class={cls}>
            <label>
                {label}
                {field.required && <em>*</em>}
            </label>
            <div class="form-controls">
                <select class="form-select" {...field}>
                    <option></option>
                    {options.map(({ value: val, label }) => {
                        return (
                            <option key={val} value={val} selected={val === value}>{label}</option>
                        )
                    })}
                </select>
                {error && <span class="invalid-message">{error}</span>}
            </div>
        </div>
    );
}
