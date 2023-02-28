import { useForm, FormContext } from './useForm';

export function Form({ action, debug, children, ...props }) {
    const form = useForm(props);
    const { handleSubmit, handleReset } = form;
    const actionProp = action ?? '#';
    const isFuncion = typeof children === 'function';
    return (
        <FormContext.Provider value={form}>
            <form
                onSubmit={handleSubmit}
                onReset={handleReset}
                action={actionProp}
            >
                {isFuncion ? children(form) : children}
                { debug && printDebug(form) }
            </form>
        </FormContext.Provider>
    );
}


function printDebug(form) {
    const data = Object.entries(form).reduce((acc, [key, value]) => {
        if (typeof value !== 'function') {
            acc[key] = value;
        }
        return acc;
    }, {});
    return (
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}