import { Stack } from '@sui/components';
import { Back } from '../components/Back';
import { Box } from '../components/Box';
import { Code } from '../components/Code';
import { Section } from '../components/Section';


export default function StackPage() {
    return (
        <div>
            <h1>Stack</h1>
            <Section>
                <Code>
                    <Back height={300}>
                        <Stack>
                            <Stack.Item>
                                <Box>I</Box>
                            </Stack.Item>
                            <Stack.Item filled>
                                <Box hmax>II</Box>
                            </Stack.Item>
                            <Stack.Item>
                                <Box>III</Box>
                            </Stack.Item>
                        </Stack>
                    </Back>
                </Code>
            </Section>
        </div>
    );
}