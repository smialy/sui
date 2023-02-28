import { useState } from 'preact/hooks';
import {
    Flex,
} from '@sui/components/';
import { Back } from '../components/Back';
import { Section } from '../components/Section';
import { Code } from '../components/Code';

export default function FlexPage() {
    const [state, setState] = useState({
        direction: '',
        justify: '',
        align: '',
    });

    const changeHandler = e => {
        const input = e.target;
        setState({ ...state, [input.name]: input.value });
    }
    return (
        <div>
            <h2>Flex</h2>
            <Section>
                <Code>
                    <Flex.Row>
                        <Flex.Col><Dummy>1 of 3</Dummy></Flex.Col>
                        <Flex.Col><Dummy>2 of 3</Dummy></Flex.Col>
                        <Flex.Col><Dummy>3 of 3</Dummy></Flex.Col>
                    </Flex.Row>
                </Code>
            </Section>

            <Section>
                <Code>
                    <Flex.Row>
                        <Flex.Col>
                            <Dummy>1 of 3</Dummy>
                        </Flex.Col>
                        <Flex.Col size={6}><Dummy>2 of 3</Dummy></Flex.Col>
                        <Flex.Col><Dummy>3 of 3</Dummy></Flex.Col>
                    </Flex.Row>
                </Code>
            </Section>

            <Section>
                <Code>
                    <Flex.Row>
                        <Flex.Col><Dummy>1 of 3</Dummy></Flex.Col>
                        <Flex.Col size={2}><Dummy>2 of 3</Dummy></Flex.Col>
                        <Flex.Col><Dummy>3 of 3</Dummy></Flex.Col>
                    </Flex.Row>
                </Code>
            </Section>

            <Section>
                <Code>
                    <Flex.Row>
                        <Flex.Col><Dummy>1 of 3</Dummy></Flex.Col>
                        <Flex.Col size="auto"><Dummy>2 of 3</Dummy></Flex.Col>
                        <Flex.Col><Dummy>3 of 3</Dummy></Flex.Col>
                    </Flex.Row>
                </Code>
            </Section>

            <Section>
                <Code>
                    <Flex.Row>
                        <Flex.Col><Dummy>1 of 4</Dummy></Flex.Col>
                        <Flex.Col><Dummy>2 of 4</Dummy></Flex.Col>
                        <Flex.Col><Dummy>3 of 4</Dummy></Flex.Col>
                        <Flex.Col><Dummy>4 of 4</Dummy></Flex.Col>
                    </Flex.Row>
                    <Flex.Row>
                        <Flex.Col size="8"><Dummy>1 of 2</Dummy></Flex.Col>
                        <Flex.Col size="4"><Dummy>2 of 2</Dummy></Flex.Col>
                    </Flex.Row>
                </Code>
            </Section>

            <Section>
                <Code>
                    <Flex.Row>
                        <Flex.Col md="8"><Dummy>md-8</Dummy></Flex.Col>
                        <Flex.Col md="4"><Dummy>md-4</Dummy></Flex.Col>
                    </Flex.Row>
                    <Flex.Row>
                        <Flex.Col lg="8"><Dummy>lg-8</Dummy></Flex.Col>
                        <Flex.Col lg="4"><Dummy>lg-4</Dummy></Flex.Col>
                    </Flex.Row>
                    <Flex.Row>
                        <Flex.Col xl="8"><Dummy>xl-8</Dummy></Flex.Col>
                        <Flex.Col xl="4"><Dummy>xl-4</Dummy></Flex.Col>
                    </Flex.Row>
                    <Flex.Row>
                        <Flex.Col xxl="8"><Dummy>xxl-8</Dummy></Flex.Col>
                        <Flex.Col xxl="4"><Dummy>xxl-4</Dummy></Flex.Col>
                    </Flex.Row>
                </Code>
            </Section>

            <Section>
                <FlexCode state={state} />
                <FlexForm configs={FLEX_CONFIGS} onChange={changeHandler} />
            </Section>
            <Section>
                <Code>
                    <Flex.Row>
                        <Flex.Col><O>Col</O></Flex.Col>
                        <Flex.Col><O>Col</O></Flex.Col>
                        <Flex.Col><O>Col</O></Flex.Col>
                    </Flex.Row>
                    <Flex.Row>
                        <Flex.Col xl><O>Col xl</O></Flex.Col>
                        <Flex.Col xl><O>Col xl</O></Flex.Col>
                    </Flex.Row>
                    <Flex.Row>
                        <Flex.Col lg><O>Col lg</O></Flex.Col>
                        <Flex.Col lg><O>Col lg</O></Flex.Col>
                    </Flex.Row>
                    <Flex.Row>
                        <Flex.Col md><O>Col md</O></Flex.Col>
                        <Flex.Col md><O>Col md</O></Flex.Col>
                    </Flex.Row>
                    <Flex.Row>
                        <Flex.Col sm><O>Col sm</O></Flex.Col>
                        <Flex.Col sm><O>Col sm</O></Flex.Col>
                    </Flex.Row>
                    <Flex.Row size="3">
                        <Flex.Col><O>Col</O></Flex.Col>
                        <Flex.Col><O>Col</O></Flex.Col>
                        <Flex.Col><O>Col</O></Flex.Col>
                        <Flex.Col><O>Col</O></Flex.Col>
                        <Flex.Col><O>Col</O></Flex.Col>
                    </Flex.Row>
                </Code>
            </Section>
            {gridCols()}

        </div>
    );
}

const Dummy = ({ children }) => (
    <div style="padding:1rem;background:#ddd;border:solid 1px #888;text-align:center;">{children}</div>
);
const DummyFlex = ({children }) => (
    <div style="height:100%;padding:1rem;background:#ddd;border:solid 1px #888;text-align:center;">{children}</div>
);
DummyFlex.displayName = 'Dummy';

const FLEX_CONFIGS = [{
    name: "direction",
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
}, {
    name: 'justify',
    options: ['start', 'center', 'end', 'between', 'around', 'evenly']
}, {
    name: "align",
    options: ['start', 'center', 'end', 'stretch', 'baseline'],
}];

const FlexForm = ({ configs, onChange }) => {
    const cols = configs.map(({ name, options }) => (
        <Flex.Col key={name}>
            {name}
            {options.map(option => {
                const id = `flex-${name}-${option}`;
                return (
                    <div key={id}>
                        <input id={id} type="radio" name={name} value={option} onChange={onChange} />
                        <label for={id}>{option}</label>
                    </div>
                );
            })}
        </Flex.Col>
    ));
    return (
        <Flex.Row>
            {cols}
        </Flex.Row>
    );
};

const FlexCode = ({ state }) => {
    const props = Object.entries(state).reduce((acc, [key, value]) => {
        if (value) {
            acc[key] = value;
        }
        return acc;
    }, {style: 'min-height:8rem'});
    return (
        <Code>
            <Flex.Row {...props}>
                <Flex.Col size="3">
                    <DummyFlex>I</DummyFlex>
                </Flex.Col>
                <Flex.Col size="3">
                    <DummyFlex>II</DummyFlex>
                </Flex.Col>
                <Flex.Col size="3">
                    <DummyFlex>III</DummyFlex>
                </Flex.Col>
            </Flex.Row>
        </Code>
    );
};

function gridCols() {
    const buff = [];
    for (let i = 1; i < 12; i += 1) {
        buff.push(
            <Flex.Row>
                <Flex.Col size={i}><O>size={i}</O></Flex.Col>
                <Flex.Col size={12 - i}><O>size={12 - i}</O></Flex.Col>
            </Flex.Row>
        );
    }
    return (
        <Code>{buff}</Code>
    );
}
const O = ({ children }) => <div style="outline:solid 1px #ddd;padding:16px;background:#fff">{children}</div>;
O.displayName = 'Dummy';