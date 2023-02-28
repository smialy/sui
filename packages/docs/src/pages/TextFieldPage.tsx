import { TextField } from '@sui/components';
import { Code } from '../components/Code';
import { Section } from '../components/Section';

export default function TextFieldPage() {
    return (
        <div>
            <h1>Text Input</h1>
            <Section>
                <Code>
                    <TextField label="Password" placeholder="Placeholder" help="Your password must be 8-20 characters long..." />
                </Code>
            </Section>

            <Section>
                <Code>
                    <TextField placeholder="Helper" help="Your password must be 8-20 characters long..." />
                </Code>
            </Section>

            <Section>
                <Code>
                    <TextField label="Disabled" disabled value="Some extra value" />
                </Code>
            </Section>

            <Section>
                <Code>
                    <TextField label="Readonly" readonly value="Some extra value" />
                </Code>
            </Section>

            <Section>
                <Code>
                    <TextField label="Error" invalid value="Hello world" help="Invalid entry"/>
                </Code>
            </Section>

            <Section>
                <Code>
                    <TextField label="Valid" valid value="Hello world" help="Correct entry." />
                </Code>
            </Section>

        </div>
    );
}