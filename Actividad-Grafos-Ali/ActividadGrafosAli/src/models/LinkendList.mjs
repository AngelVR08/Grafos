import Node from "./Node.mjs";
import City from "./City.mjs";

export default class LinkedList {
    #head;
    #count;

    constructor() {
        this.#head = null;
        this.#count = 0;
    }

    push(cityName, distance) {
        let city = new City(cityName, distance);
        let node = new Node(city);
        if (this.#head === null) {
            this.#head = node;
        } else {
            let current = this.#head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.#count++;
    }

    size() {
        return this.#count;
    }

    isEmpty() {
        return this.#head === null;
    }

    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next;
            }
            return node;
        }
        return null;
    }

    *iterator() {
        let current = this.#head;
        while (current !== null) {
            yield current.value;
            current = current.next;
        }
    }
}
