class Graph {
    constructor(directed = true) {
        this.directed = directed;
        this.nodes = [];
        this.edges = new Map();
    }

    addNode(key) {
        this.nodes.push(key);
    }

    addEdge(a, b, weight) {
        this.edges.set(JSON.stringify([a, b]), { a, b, weight });

        if (!this.directed)
            this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
    }

    removeNode(key) {
        this.nodes = this.nodes.filter(n => n !== key);
        
        [...this.edges.values()].forEach(({ a, b }) => {
            if (a === key || b === key) 
                this.edges.delete(JSON.stringify([a, b]));
        });
    }

    removeEdge(a, b) {
        this.edges.delete(JSON.stringify([a, b]));

        if (!this.directed) 
            this.edges.delete(JSON.stringify([b, a]));
    }

    findNode(key) {
        return this.nodes.find(x => x === key);
    }

    hasEdge(a, b) {
        return this.edges.has(JSON.stringify([a, b]));
    }

    setEdgeWeight(a, b, weight) {
        this.edges.set(JSON.stringify([a, b]), { a, b, weight });

        if (!this.directed)
            this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
    }

    getEdgeWeight(a, b) {
        return this.edges.get(JSON.stringify([a, b])).weight;
    }

    adjacent(key) {
        return [...this.edges.values()].reduce((acc, { a, b }) => {
            if (a === key) 
                acc.push(b);
            return acc;
        }, []);
    }

    dijkstra(init, source) {
        let distances = {}, parents = {}, visited = new Set();

        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i] === source) {
                distances[source] = 0;
            } else {
                distances[this.nodes[i]] = Infinity;
            }
            parents[this.nodes[i]] = null;
        }
        
        let currVertex = this.vertexWithMinDistance(distances, visited);

        while (currVertex !== null) {
            let distance = distances[currVertex],
                neighbors = this.adjacent(currVertex);
            for (let neighbor of neighbors) {
                let newDistance = distance + this.getEdgeWeight(currVertex, neighbor);
                if (distances[neighbor] > newDistance) {
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currVertex;
                }
            }
            visited.add(currVertex);
            currVertex = this.vertexWithMinDistance(distances, visited);
        }

        console.log(distances, parents);

        return this.getShortDistance(init, parents, distances);
    }

    vertexWithMinDistance(distances, visited) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited.has(vertex)) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }

    getShortDistance(start, parents, distances) {
        const route = [];
        let currentIndex = start;

        while (currentIndex !== null) {
            if (parents[currentIndex] !== null)
                route.push({
                    vertex: parents[currentIndex],
                    distance: distances[parents[currentIndex]],
                    edge: `${currentIndex} ➜ ${this.getEdgeWeight(currentIndex, parents[currentIndex])} ➜ ${parents[currentIndex]}`
                });

                currentIndex = parents[currentIndex];
        }

        return route;
    }
};