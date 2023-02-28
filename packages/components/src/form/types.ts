export interface DefaultValues {
    [field: string]: any;
}

export type Errors<Values> = any;

export interface Touched {
    [field: string]: boolean;
}

export interface Config<Values>  {
    status?: any,
    values?: Values,
    errors?: Errors<Values>,
    onError?: (errors: Errors<Values>) => Promise<void>;
    onSubmit?: (values: Values, helpers: MethodHelpers<Values>) => Promise<Values>;
    onReset?:(values: Values, helpers: MethodHelpers<Values>) => Promise<Values>;
    onValidate?: (values: Values) => Promise<Errors<Values>>;
}

export interface State<Values> {
    status?: any;
    values: Values;
    errors: Errors<Values>;
    touched: Touched,
    globalErrors: [],
    valid: boolean,
    submitting: boolean;
    validating: boolean;
    submitCount: number;
}

export interface MethodHelpers<Values> {
    resetForm: (next?: Partial<State<Values>>) => Promise<void>,
    validateForm: (values?: Values) => Promise<Errors<Values>>,
    setErrors: (errors: Errors<Values>) => void,
    setError: (field: string, value: any) => void,
    setTouched: (values: any) => void,
    setFieldTouched: (field: string, value: boolean) => void,
    setValue: (field: string, value: any) => void,
    setValues: (values: Values) => void,
    setStatus: (status: any) => void,
    submitForm: () => void,
}

export interface FieldHelpers<Value> {
    setValue(value: Value): void,
    setError(error: string): void,
    setTouched(value: boolean): void,
}

export interface FieldInputProps<Value> {
    name: string,
    value: Value,
    checked?: boolean,
    onChange(event: Event): void,
    onBlur(event: Event): void,
}

export interface FieldMeta<Value> {
    value: Value;
    error?: string;
    touched: boolean;
}

export interface Hadlers {
    handleChange(event: Event): void,
    handleBlur(event: Event): void,
    handleSubmit(event: Event): void,
    handleReset(event: Event): void,
    getFieldInfo(),
}