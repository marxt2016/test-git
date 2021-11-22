import { View } from './View';

export class FilmView extends View {
    render() {
        const container = document.createElement('div');
        container.textContent = 'Film view';
        this.getRoot().append(container);

    }
}