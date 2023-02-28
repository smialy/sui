// import { stylesheet as b5 } from './styles/b5.css';
import { stylesheet as main } from './main.css';
import { stylesheet as cstyles } from './components/components.css';


export function importStyles(): () => void {
    const els = [main, cstyles].map(stylesheet => {
        const style = document.createElement('style');
        style.innerHTML = stylesheet;
        document.head.appendChild(style);
        return style;
    }) as HTMLElement[];
    return () => {
        els.forEach(el => el.parentNode?.removeChild(el));
    };
}