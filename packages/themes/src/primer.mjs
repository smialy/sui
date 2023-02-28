
// import { stylesheet as b5 } from 'bootstrap/dist/css/bootstrap.min.css';
import { stylesheet as primer } from './primer.css';
import { stylesheet as primerext } from './primer-ext.css';
import { importStyles } from './styles';

export class Activator {
    start() {
        this.dispose = importStyles([primer, primerext]);
    }
    stop() {
        this.dispose();
    }
}