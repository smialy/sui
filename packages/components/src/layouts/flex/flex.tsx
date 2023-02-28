import { classNames } from '@stool/dom';

export const Flex = ({ direction, justify, align, children, ...props }: any) => {
    const dir = direction ? `flex-direction-${direction}` : null;
    const just = justify ? `justify-content-${justify}` : null
    const alig = align ? `align-items-${align}` : null
    const cls = classNames('row', dir, just, alig);
    return (
        <div className={cls} {...props}>
            {children}
        </div>
    );
}
export const FlexRow = ({ direction, justify, align, size, sm, md, lg, xl, xxl, children, ...props }: any) => {
    direction = direction ? `flex-direction-${direction}` : null;
    justify = justify ? `justify-content-${justify}` : null
    align = align ? `align-items-${align}` : null

    const rows = [
        size ? size : '',
        typeof sm === 'boolean' ? 'sm' : sm ? `sm-${sm}` : '',
        typeof md === 'boolean' ? 'md' : md ? `md-${md}` : '',
        typeof lg === 'boolean' ? 'lg' : lg ? `lg-${lg}` : '',
        typeof xl === 'boolean' ? 'xl' : xl ? `xl-${xl}` : '',
        typeof xxl === 'boolean' ? 'xxl' : xxl ? `xxl-${xxl}` : '',
    ].filter(row => row).map(row => `row-cols-${row}`);

    const cls = classNames('row', direction, justify, align, rows);
    return (
        <div className={cls} {...props}>
            {children}
        </div>
    )
};
FlexRow.displayName = 'Flex.Row';

export const FlexCol = ({ size, sm, md, lg, xl, xxl, children }: any) => {
    const cols = [
        size ? size : '',
        typeof sm === 'boolean' ? 'sm' : sm ? `sm-${sm}` : '',
        typeof md === 'boolean' ? 'md' : md ? `md-${md}` : '',
        typeof lg === 'boolean' ? 'lg' : lg ? `lg-${lg}` : '',
        typeof xl === 'boolean' ? 'xl' : xl ? `xl-${xl}` : '',
        typeof xxl === 'boolean' ? 'xxl' : xxl ? `xxl-${xxl}` : '',
    ].filter(col => col).map(col => `col-${col}`)
    const cls = classNames(cols);
    return (
        <div className={cls ? cls : 'col'}>
            {children}
        </div>
    )
};
FlexCol.displayName = 'Flex.Col';

Flex.Row = FlexRow;
Flex.Col = FlexCol;
