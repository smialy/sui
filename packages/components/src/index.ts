import { importStyles } from './styles';
export * from './layouts/bullseye/bullseye';
export * from './layouts/flex/flex';
export * from './layouts/split/split';
export * from './layouts/stack/stack';

export * from './form';
export * from './container/container';
export * from './paper/paper';
export * from './card/card';
export * from './button/button';
export * from './textfield/textfield';
export * from './icon/icon';

export class Activator {
    private style = null;
    start() {
        this.style = importStyles();
    }
    stop() {
        this.style();
    }
}
