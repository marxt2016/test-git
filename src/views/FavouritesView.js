import { View } from './View';

export class FavouritesView extends View {
    render() {
        const container = document.createElement('div');
        container.textContent = 'Favourites view';
        this.getRoot().append(container);

    }
}