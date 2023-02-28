import {
    Paper,
} from '@sui/components';
import { Back } from '../components/Back';
import { Code } from '../components/Code';
import { Section } from '../components/Section';

const Box = ({ children = null }) => <div style="height:80px">{children}</div>
Box.displayName = 'Box';

export default function PaperPage() {
    return (
        <div>
            <h1>Paper</h1>
            <Section>
                <Back boxes>
                    <Code>
                        <Paper>
                            <Box />
                        </Paper>
                        <Paper>
                            <Box />
                        </Paper>
                        <Paper>
                            <Box />
                        </Paper>
                        <Paper>
                            <Box />
                        </Paper>
                    </Code>
                </Back>
            </Section>
        </div>
    );
}