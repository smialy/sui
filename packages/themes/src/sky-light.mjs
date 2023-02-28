import { stylesheet } from './sky-light.css';

export class Activator {
    start(ctx) {
        ctx.registerService('core.ui.stylesheet', stylesheet);
    }
}