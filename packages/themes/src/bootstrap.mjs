
import { importStyles } from './styles';
import { stylesheet } from './bootstrap.css';

export class Activator {
    start() {
        this.dispose = importStyles([stylesheet]);
    }
    stop() {
        this.dispose();
    }
}