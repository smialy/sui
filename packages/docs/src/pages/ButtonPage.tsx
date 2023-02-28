import {
    Button,
} from '@sui/components';
import { Code, SyntaxHighlighter } from '../components/Code';
import { Section } from '../components/Section';

export default function ButtonPage() {
    return (
        <div>
            <h1>Button</h1>

            <Section title='Types'>
                <Code>
                    <Button>Default</Button>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="warning">Danger</Button>
                    <Button variant="link">Link</Button>
                </Code>
            </Section>

            <Section title="Disabled">
                <Code>
                    <Button disabled>Default</Button>
                    <Button disabled variant="primary">Primary</Button>
                    <Button disabled variant="secondary">Secondary</Button>
                    <Button disabled variant="danger">Danger</Button>
                    <Button disabled variant="warning">Danger</Button>
                    <Button disabled variant="link">Link</Button>
                </Code>
            </Section>

            <Section title="Sizes">
                <Code>
                    <Button size="small">Small</Button>
                    <Button>Default</Button>
                    <Button size="large">Large</Button>
                </Code>
            </Section>

            <Section title="Block">
                <Code>
                    <Button block size="small">Small</Button>
                    <Button block >Default</Button>
                    <Button block size="large">Large</Button>
                </Code>
            </Section>

            <Section>
                <Code>
                    <Button.Group>
                        <Button primary>One</Button>
                        <Button primary>Two</Button>
                        <Button primary>Three</Button>
                    </Button.Group>
                </Code>
            </Section>

            <Section>
                <Code>
                    <Button icon="compass"></Button>
                    <Button primary icon="arrow-up">Primary</Button>
                    <Button variant="invisible" icon="arrow-up">Invisible</Button>
                    <Button disabled icon="arrow-down">Disabled</Button>
                    <Button primary disabled icon="arrow-up">Icon</Button>
                </Code>
            </Section>

        </div>
    );
}