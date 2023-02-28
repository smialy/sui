import { stylesheet } from './sky-dark.css';

export class Activator {
    start(ctx) {
        ctx.registerService('core.ui.stylesheet', stylesheet);
    }
}