import {
    Container,
} from '@sui/components';
import { Code } from '../components';

export default function ContainerPage() {
    return (
        <div>
            <h1>Container</h1>
            <Code>
                <Container><O>Container</O></Container>
                <Container fluid><O>Container Fluid</O></Container>
                <Container xxl><O>Container XXL</O></Container>
                <Container xl><O>Container XL</O></Container>
                <Container md><O>Container MD</O></Container>
                <Container sm><O>Container SM</O></Container>
            </Code>
        </div>
    );
}

const O = ({ children }) => <div style="outline:solid 1px #ddd;padding:16px;background:#fff">{children}</div>;
O.displayName = 'O';
