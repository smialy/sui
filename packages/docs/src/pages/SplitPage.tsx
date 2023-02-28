import { Split } from '@sui/components';
import { useEffect } from 'preact/hooks';
import { Back } from '../components';
import { Box } from '../components/Box';
import { Code } from '../components/Code';
import { Section } from '../components/Section';


export default function SplitPage() {
    return (
        <div>
            <h1>Split</h1>
            <Section>
                <Code>
                    <Back height={300}>
                        <Split>
                            <Split.Item>
                                <Box>I</Box>
                            </Split.Item>
                            <Split.Item filled>
                                <Box>II</Box>
                            </Split.Item>
                            <Split.Item>
                                <Box>III</Box>
                            </Split.Item>
                        </Split>
                    </Back>
                </Code>
            </Section>
        </div>
    );
}