import {
    Form,
    FormText,
    FormCheckbox,
    Button,
} from '@sui/components';
import { useCallback, useState } from 'preact/hooks';
import { Back } from '../components';
import { Box } from '../components/Box';
import { Code } from '../components/Code';
import { Section } from '../components/Section';

const sleep = (time) =>
    new Promise(resolve => setTimeout(resolve, time * 1000))

export default function FormPage() {
    const [values, setValues] = useState({
        name: "name",
        url: "url",
        remember: true
    });

    const submitHandler = useCallback((values, { resetForm, setError }) => {
        if (values.name == 'test') {
            setError('name', 'Name already exists');
        } else {
            setValues(values);
            resetForm({values});
        }
    }, []);
    const valideHandler = useCallback(async (values) => {
        await sleep(1);
        if (!values.name){
            return {name:'Field is required'};
        }
        return false;
    }, []);

    const errorHandler = useCallback(() => {
        console.log('errorHandler');
    }, []);
    const resetHandler = useCallback((values) => {
        console.log('resetHandler', values);

    }, []);
    return (
        <div>
            <h1>Form</h1>
            <Section>

            <Form
                debug={true}
                values={values}
                onValidate={valideHandler}
                onSubmit={submitHandler}
                onError={errorHandler}
                onReset={resetHandler}
            >
                {form => (
                    <>
                        <pre>{JSON.stringify(form.values)}</pre>
                        <FormText label="Nazwa" name="name" />
                        <FormText label="Url" name="url" />
                        <FormCheckbox label="Remember" name="remember" />
                        <Button type="reset" disabled={form.submitting}>Reset</Button>
                        <Button primary type="submit" disabled={form.submitting}>Save</Button>
                    </>
                )}
            </Form>
            </Section>
        </div>
    );
}