import {
    Flex,
    Card,
} from '@sui/components';
import { Back, Code, SyntaxHighlighter, Section, ImageDummy } from '../components';


export default function CardPage() {

    return (
        <div>
            <h1>Card</h1>
            <Section>
                <Flex.Row size={3}>
                    <Flex.Col>
                        <Code>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Title</Card.Title>
                                    <Card.Text>
                                        Text
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Code>
                    </Flex.Col>
                </Flex.Row>
            </Section>
            <Section>
                <Flex.Row size={3}>
                    <Flex.Col>
                        <Code>
                            <Card>
                                <Card.Header>
                                    Card Header
                                </Card.Header>
                                <Card.Media>
                                    <ImageDummy />
                                </Card.Media>
                                <Card.Body>
                                    Car bordy
                                </Card.Body>
                                <Card.Footer>
                                    Card Footer
                                </Card.Footer>
                            </Card>
                        </Code>
                    </Flex.Col>
                </Flex.Row>
            </Section>
        </div>
    );
}