import { FilmsView } from "../../views/FilmsView";


export class Router {
    #controller
    #routes
    #root

    constructor(routes, root) {
        this.#routes = routes;
        this.#controller = null;
        this.#root = root;
    }

    setController(controller) {
        this.#controller = controller;
    }

    #getRouteInfo() {
        const { location } = window;
        const { hash } = location;
        return {
            routeName: hash.slice(1),
        }
    }

    #hashChange() {
        const routeInfo = this.#getRouteInfo();
        const TargetView = this.#routes[routeInfo.routeName] || FilmsView;
        if (TargetView) {
            this.#root.innerHTML = '';
            const paramsForRender = this.#controller.getViewParams(routeInfo.routeName);
            const targetView = new TargetView(this.#root);
            targetView.render(...paramsForRender);
            console.log(paramsForRender);
        }

    }
    init() {
        window.addEventListener('hashchange', this.#hashChange.bind(this));
        this.#hashChange();

    }
}