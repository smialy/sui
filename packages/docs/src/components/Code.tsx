import { h, ComponentChildren, VNode } from "preact";
import { Section } from "./Section";

type CodeProps = {
    children?: ComponentChildren | string;
}

const getProps = (props: any) => {
    return Object.entries(props).reduce((acc, [name, value]) => {
        if (name !== 'children') {
            acc.push([name, value]);
        }
        return acc;
    }, []);
};

const renderNodes = (nodes, deep: number = 0) =>
    nodes.map(node => renderNode(node, deep));

const renderNode = (node: any, deep: number = 0) => {
    const space = ' '.repeat(deep*4);
    if (node.name === 'text') {
        return space + node.value + '\n';
    }
    if (node.tag === 'Dummy' || node.props.some(([name, _]) => name === 'dummy')) {
        return renderNodes(node.children, deep)
    }
    const end = node.single ? '/>' : '>';
    const attrs = node.props.map(renderNodeAttr);
    if (node.children.length) {
        return (
            <>
                {space}
                <span class="token tag">
                    <span class="token tag">
                        <span class="token punctuation">&lt;</span>
                        {node.tag}
                    </span>
                    {attrs}
                    <span class="token punctuation">{end}{'\n'}</span>
                </span>
                {renderNodes(node.children, deep + 1)}
                {space}
                <span class="token tag">
                    <span class="token tag">
                        <span class="token punctuation">&lt;</span>
                        {node.tag}
                    </span>
                    <span class="token punctuation">{'>'}{'\n'}</span>
                </span>
            </>
        );
    }
    return (
        <>
            {space}
            <span class="token tag">
                <span class="token tag">
                    <span class="token punctuation">&lt;</span>
                    {node.tag}
                </span>
                {attrs}
                <span class="token punctuation">{end}{'\n'}</span>
            </span>
        </>
    );
}
const renderNodeAttr = ([name, value]) => {
    if (name === 'style') {
        return null;
    }
    if (value !== true) {
        return (
            <>
                {' '}
                <span class="attr-name">{name}</span>
                <span class="attr-equal">=</span>
                <span class="attr-value">
                    <span class="token punctuation">"</span>
                    {value}
                    <span class="token punctuation">"</span>
                </span>
            </>
        );
    }
    return (
        <>
            {' '}
            <span class="attr-name">{name}</span>
        </>
    );
};
const prepareNodes = (nodes) => {
    nodes = Array.isArray(nodes) ? nodes : [nodes];
    return [...normalizeTextNodes(nodes.map(prepareNode))];
};

function *normalizeTextNodes(nodes) {
    let prev = null;
    for(const node of nodes) {
        if (node.name === 'text') {
            if (prev && prev.name === 'text') {
                prev = {
                    name: 'text',
                    value: prev.value + node.value,
                };
            } else {
                prev = node;
            }
        } else {
            if(prev) {
                yield prev;
                prev = null;
            }
            yield node;
        }
    }
    if (prev) {
        yield prev;
    }
}

const prepareNode = (node) => {
    if (node.type && node.props) {
        return {
            name: 'vnode',
            tag: node.type.displayName || node.type.name || 'Node',
            props: getProps(node.props),
            single: !node.props.children,
            children: prepareNodes(node.props.children || []),
        }
    }
    const type = typeof node;
    if (type == 'string') {
        return {
            name: 'text',
            value: node,
        };
    }
    if (node) {
        return {
            name: 'text',
            value: node.toString(),
        };
    }
    console.log({ node });
};

export const Code = ({ children }: CodeProps) => {
    return (
        <>
            <Section>
                {children}
            </Section>

            <pre className="code">
                <code>
                    {renderNodes(prepareNodes(children))}
                </code>
            </pre>
        </>
    );
}
