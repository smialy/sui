
export function importStyles(styles) {
    const element = document.createElement('style');
    element.dataset.name = '@sui/themes';
    element.innerHTML = styles.join("\n");
    document.head.appendChild(element);
    return () => {
        element?.parentNode?.removeChild(element);
    };
}