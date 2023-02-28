// import BRANDS from './sprites/brands.svg';
// import SOLID from './sprites/solid.svg';
// import REGULAR from './sprites/regular.svg';
import SOLID from './solid';

const ID = 'sui.icons';

function addIcons(text: string): () => void {
    const oldElement = document.querySelector(`#${ID}`);
    if (oldElement?.parentElement) {
        oldElement.parentElement.removeChild(oldElement);
    }
    const div = document.createElement('div');
    div.id = ID;
    div.innerHTML = text;
    document.body.appendChild(div);
    return () => div.parentNode?.removeChild(div);
}

export class Activator {
    private icons;
    start(ctx) {
        this.icons = addIcons(SOLID);
    }
    stop() {
        this.icons();
    }
}
