import { classNames } from '@stool/dom';
import { TextField } from '../textfield/textfield';
import { useFormField } from './useForm';

export function FormText({ label, help, ...props }) {
    const { field, meta: { error, touched } } = useFormField(props);
    return (
        <TextField
            label={label}
            invalid={error && touched}
            help={error && touched ? error : help}
            {...field}
        />
    );
    // const cls = classNames('form-group', {
    //     invalid: !!error,
    // });
    // return (
    //     <div class={cls}>
    //         <label>
    //             {label}
    //             {field.required && <em>*</em>}
    //         </label>
    //         <div class="form-controls">
    //             <input type="text" {...field} />
    //             {error && <span class="invalid-message">{error}</span>}
    //         </div>
    //     </div>
    // );
}
