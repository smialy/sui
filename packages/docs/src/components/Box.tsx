

export const Box = ({ hmax, children }: any) => {
    const cls = ['box'];
    if (hmax) {
        cls.push('box-hmax');
    }
    return <div class={cls.join(" ")}>{children}</div>
}
Box.displayName = 'Dummy';