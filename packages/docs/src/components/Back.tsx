type BackProps = {
    boxes?: boolean;
    gap?: number;
    columns?: number;
    children?: any;
    height?: string | number,
}

export const Back = ({ height, boxes = false, gap = 32, columns = 3, children }: BackProps) => {
    const styles = [];
    if (boxes) {
        styles.push('display:grid');
        if (gap) {
            styles.push(`gap:${typeof gap === 'number' ? gap : 32 }px`);
        }
        if (columns) {
            styles.push('grid-template-columns:' + ('1fr '.repeat(columns)));
        }
    }
    if (height) {
        if (typeof height === 'number') {
            height = `${height}px`;
        }
        styles.push(`height:${height}`);
    }
    return (
        <div className="back" style={styles.join(';')}>
            {children}
        </div>
    );
}
Back.displayName = 'Dummy';