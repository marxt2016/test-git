import { View } from './View';

export class FilmsView extends View {
    render() {
        const container = document.createElement('div');
        container.textContent = 'Films view';
        this.getRoot().append(container);

    }
}