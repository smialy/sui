import { stylesheet as icon } from './icon/icon.css';
import { stylesheet as bullseye } from './layouts/bullseye/bullseye.css';
import { stylesheet as split } from './layouts/split/split.css';
import { stylesheet as stack } from './layouts/stack/stack.css';

export const styles = [
    bullseye,
    split,
    stack,
    // bs5,
    // theme,
    icon,
    // container,
    // grid,
    // card,
    // button,
    // textfield,
    // paper,
    // button,
].join(' ');

export function importStyles(): () => void {
    const element = document.createElement('style');
    element.dataset.name = '@sui/components';
    element.innerHTML = styles;
    document.head.appendChild(element);
    return () => {
        element.parentNode.removeChild(element);
    };
}