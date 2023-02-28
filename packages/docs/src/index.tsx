import { render } from 'preact';
import { importStyles } from './styles';
import { Main } from './main';

interface IDisposeable {
    (): void;
}
export class Activator {
    private toDispose: IDisposeable[] = [];
    start(ctx) {
        this.toDispose.push(
            importStyles(),
        );
        const container = document.createElement('div');
        document.body.appendChild(container);
        render(<Main />, container);
    }
    stop() {
        for (const dispose of this.toDispose) {
            dispose();
        }
    }
}
