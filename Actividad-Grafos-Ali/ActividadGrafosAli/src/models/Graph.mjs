import LinkedList from './LinkendList.mjs';

export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(value, this.#matrizAdyacencia.length - 1);
        }
    }

    addV(value) {
        this.#matrizAdyacencia.push(new LinkedList());
        this.#map.set(value, this.#matrizAdyacencia.length - 1);
    }

    addConexion(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#matrizAdyacencia[this.#map.get(start)].push(end, weight);
            return true;
        }
        return false;
    }

    bfs(callback){
        let queue = [];
        let list = [];
        const entries = [...structuredClone(this.#map)];
        for (let i = 0; i < this.#matrizAdyacencia.length; i++)
            list[i] = false;

        let [key] = entries[0];
        queue.push(key);

        while (queue.length > 0) {
            let val = queue.shift(); 
            callback(val); 
            list[this.#map.get(val)] = true; 
            for (let i = 0; i < this.#matrizAdyacencia[this.#map.get(val)].length; i++) {
                if (this.#matrizAdyacencia[this.#map.get(val)][i]) {
                    let [key] = entries[i];
                    if (!list[this.#map.get(key)] && !queue.includes(key))
                        queue.push(key); 
                }
            }
        }
    }

    dfs(callback) {
        const visited = new Array(this.#matrizAdyacencia.length).fill(false);
        const entries = [...this.#map.entries()];

        const dfsVisit = (vertex) => {
            const index = this.#map.get(vertex);
            if (!visited[index]) {
                callback(vertex);
                visited[index] = true;
                const neighbors = this.#matrizAdyacencia[index].iterator();
                for (const neighbor of neighbors) {
                    dfsVisit(neighbor.name);
                }
            }
        };

        if (entries.length > 0) {
            dfsVisit(entries[0][0]);
        }
    }
}
