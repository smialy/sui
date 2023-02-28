import { createContext } from "preact";
import { useCallback, useContext, useLayoutEffect, useReducer, useRef } from "preact/hooks";
import { Config, DefaultValues, Errors, FieldHelpers, FieldMeta, MethodHelpers, State } from "./types";

export const FormContext = createContext(null);


type Actions<Values> =
    { type: 'SUBMIT' }
    | { type: 'SUBMIT_SUCCESS' }
    | { type: 'SUBMIT_FAILURE' }
    | { type: 'VALIDATING', payload: boolean }
    | { type: 'SET_STATUS', payload: any }
    | { type: 'SET_TOUCHED', payload: any }
    | { type: 'SET_FIELD_TOUCHED', payload: { field: string, value: boolean } }
    | { type: 'SET_ERRORS', payload: Errors<Values> }
    | { type: 'SET_VALUE', payload: { field: string, value: any } }
    | { type: 'SET_VALUES', payload: Values }
    | { type: 'SET_ERROR', payload: any }
    | { type: 'SET_GLOBAL_ERROR', payload: any }
    | { type: 'RESET_FORM', payload: any };


const setIn = (obj, name, value) => {
    if (value === null || value === undefined) {
        obj = { ...obj };
        delete obj[name];
        return obj;
    }
    return { ...obj, [name]: value };
};

function formReducer<Values>(state: State<Values>, action: Actions<Values>) {
    const isValid = () => Object.keys(state.errors).length === 0 && state.globalErrors.length === 0;
    switch (action.type) {
        case 'SUBMIT':
            return {
                ...state,
                errors: {},
                globalErrors: [],
                valid: true,
                submitting: true,
                validating: false,
                submitCount: state.submitCount + 1,
            };
        case 'SUBMIT_SUCCESS': {
            return {
                ...state,
                submitting: false,
                valid: true,
            };
        }
        case 'SUBMIT_FAILURE': {
            return {
                ...state,
                submitting: false,
                valid: false,
            };
        }
        case 'VALIDATING': {
            return {
                ...state,
                validating: action.payload,
            };
        }
        case 'SET_VALUES':
            const { values } = state;
            return { ...state, values: { ...values, ...action.payload } };
        case 'SET_VALUE': {
            const { field, value } = action.payload;
            return {
                ...state,
                values: setIn(state.values, field, value),
            };
        }
        case 'SET_FIELD_TOUCHED':
            const { field, value } = action.payload;
            return { ...state, touched: setIn(state.touched, field, value) };
        case 'SET_TOUCHED':
            return { ...state, touched: action.payload };
        case 'SET_ERRORS':
            const errors = action.payload || {};
            return { ...state, errors, valid: isValid() };
        case 'SET_ERROR': {
            const { field, value } = action.payload;
            const errors = setIn(state.errors, field, value);
            return {
                ...state,
                errors,
                valid: isValid(),
            };
        }
        case 'SET_GLOBAL_ERROR': {
            return {
                ...state,
                globalErrors: [action.payload],
                valid: isValid(),
            };
        }
        case 'RESET_FORM':
            return {
                globalErrors: [],
                submitting: false,
                validating: false,
                valid: true,
                submitCount: 0,
                touched: {},
                ...action.payload
            };
        default:
            return state;
    }
}

export function useForm<Values = DefaultValues>(props: Config<Values>)  {
    const statusRef = useRef(props.status);
    const errorsRef = useRef(props.errors || {});
    const valuesRef = useRef(props.values || {});
    const [state, dispatch] = useReducer<State<Values>, Actions<Values>>(formReducer, {
        values: props.values || {} as Values,
        errors: props.errors || {},
        status: props.status,
        globalErrors: [],
        touched: {},
        valid: true,
        submitting: false,
        validating: false,
        submitCount: 0,
    });

    const setValues = useCallback(values => dispatch({ type: 'SET_VALUES', payload: values }), []);
    const setValue = useCallback((field, value) => dispatch({ type: 'SET_VALUE', payload: { field, value } }), []);
    const setErrors = useCallback(errors => dispatch({ type: 'SET_ERRORS', payload: errors }), []);
    const setError = useCallback((field, value) => dispatch({ type: 'SET_ERROR', payload: { field, value } }), []);
    const setStatus = useCallback(status => dispatch({ type: 'SET_STATUS', payload: status }), []);
    const setFieldTouched = useCallback((field, value) => dispatch({ type: 'SET_FIELD_TOUCHED', payload: { field, value } }), [])
    const setTouched = useCallback((values: any) => dispatch({ type: 'SET_TOUCHED', payload: values }), []);

    const handleBlur = useCallback(({ target }) => {
        const { type, name, id } = target;
        setFieldTouched(name || id, true);
    }, [setFieldTouched]);

    const handleChange = useCallback(
        ({ target }) => {
            const { type, name, id } = target;
            const field = name || id;
            let val = /checkbox/.test(type) ? target.checked : target.value;
            if (field) {
                setValue(field, val);
            } else {
                console.warn('Empty field. Add attritute: "name" to input');
            }
        },
        [setValue]
    );

    const resetForm = useCallback(async (next = null) => {
        const values = next?.values ?? valuesRef.current;
        const errors = next?.errors ?? errorsRef.current;
        const status = next?.status ?? statusRef.current;

        valuesRef.current = values;
        errorsRef.current = errors;
        statusRef.current = status;
        // const touched = next.touched ??

        const dispatchFn = () => dispatch({
            type: 'RESET_FORM',
            payload: {
                values,
                errors,
                status,
            }
        });
        if (props.onReset) {
            await props.onReset(state.values, helperMethods);
        }
        dispatchFn();
    }, []);

    const handleReset = (event: Event) => {
        if(isFunction(event.preventDefault)) {
            event.preventDefault();
        }
        if(isFunction(event.stopPropagation)) {
            event.stopPropagation();
        }
        resetForm();
    };

    const validateForm = useCallback(async (values: Values = state.values) => {
        if (props.onValidate) {
            dispatch({ type: 'VALIDATING', payload: true });
            try {
                const errors = await props.onValidate(values);
                if (errors)
                    dispatch({ type: 'SET_ERRORS', payload: errors });
                return errors;
            } catch(err) {
                dispatch({ type: 'SET_GLOBAL_ERROR', payload: err });
            } finally {
                dispatch({ type: 'VALIDATING', payload: false });
            }
        }
    }, [state.values, props.onValidate]);

    const submitForm = useCallback(async () => {
        if (state.submitting) {
            return;
        }
        dispatch({ type: 'SUBMIT' });
        const errors = await validateForm();
        if (errors) {
            if (props.onError) {
                props.onError(errors);

            }
            dispatch({ type: 'SUBMIT_FAILURE' });
        } else {
            if (props.onSubmit) {
                await props.onSubmit(state.values, helperMethods);
            }
            dispatch({ type: 'SUBMIT_SUCCESS' });
        }
    }, [validateForm, props.onError, props.onSubmit]);

    const handleSubmit = useCallback(async event => {
        if (event.preventDefault) {
            event.preventDefault();
        }
        submitForm();
    }, [submitForm]);

    const helperMethods: MethodHelpers<Values> = {
        resetForm,
        validateForm,
        setErrors,
        setError,
        setTouched,
        setFieldTouched,
        setValue,
        setValues,
        setStatus,
        submitForm,
    };

    const getFieldMeta = useCallback((name: string): FieldMeta<any> => ({
        value: state.values[name],
        error: state.errors[name],
        touched: state.touched[name],
    }), [state.errors, state.touched, state.values]);

    const getFieldHelpers = useCallback((name: string) => ({
        setValue: (value: any) => setValue(name, value),
        setError: (error: string) => setError(name, error),
        setTouched: (value: boolean) => setFieldTouched(name, value),
    }), [setValue, setFieldTouched, setError]);

    const getFieldProps = useCallback(props => {
        const { name, type, value: propValue, onChange } = props;
        const value = state.values[name];
        const field = {
            value,
            onChange: onChange || handleChange,
            onBlur: handleBlur,
            ...props,
        };
        if (type === 'radio') {
            field.checked = value === propValue;
            field.value = propValue;
        } else if (type === 'checkbox') {
            if (propValue === undefined) {
                field.checked = !!value;
            } else {
                field.checked = !!value;
                field.value = propValue;
            }
        }
        return field;
    },
    [handleChange, handleBlur, state.values]);

    return {
        ...state,
        setStatus,
        setValue,
        setValues,
        setError,
        setErrors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        getFieldProps,
        getFieldMeta,
        getFieldHelpers,
    }
}

export function useFormField(props) {
    const { getFieldProps, getFieldMeta, getFieldHelpers } = useFormContext();
    return {
        field: getFieldProps(props),
        meta: getFieldMeta(props.name),
        helpers: getFieldHelpers(props.name),
    };
}

export function useFormContext() {
    const form = useContext(FormContext);
    if (!form) {
        throw new Error('useForm must be used within a FormProvider');
    }
    return form;
}

function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
    const ref: any = useRef(fn);

    useLayoutEffect(() => {
      ref.current = fn;
    });
    return useCallback((...args: any[]) => ref.current.apply(null, args),[]) as T;
  }
function isFunction(obj: any) {
    return typeof obj === 'function';
}