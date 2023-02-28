import {
    Bullseye,
} from '@sui/components';
import { Back } from '../components';
import { Box } from '../components/Box';
import { Code } from '../components/Code';
import { Section } from '../components/Section';


export default function PaperPage() {
    return (
        <div>
            <h1>Bullseye</h1>
            <Section>
                <Code>
                    <Back height={300}>
                        <Bullseye>
                            <Box>Bullseye</Box>
                        </Bullseye>
                    </Back>
                </Code>
            </Section>
        </div>
    );
}