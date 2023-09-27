class Graph {
    constructor() {
      this.nodes = new Map();
    }
  
    addNode(name) {
      this.nodes.set(name, []);
    }
  
    addEdge(node1, node2, weight) {
      this.nodes.get(node1).push({ node: node2, weight });
      this.nodes.get(node2).push({ node: node1, weight });
    }
  
    dijkstra(startNode) {
      const visited = new Set();
      const distances = {};
      const previousNodes = {};
  
      // Initialize distances to infinity and previous nodes to null
      
      for (const node of this.nodes.keys()) {
        distances[node] = Infinity;
        previousNodes[node] = null;
      }
  
      distances[startNode] = 0;
  
      while (visited.size < this.nodes.size) {
        const currentNode = this.getMinDistanceNode(distances, visited);
  
        for (const neighbor of this.nodes.get(currentNode)) {
          const { node, weight } = neighbor;
          const tentativeDistance = distances[currentNode] + weight;
  
          if (tentativeDistance < distances[node]) {
            distances[node] = tentativeDistance;
            previousNodes[node] = currentNode;
          }
        }
  
        visited.add(currentNode);
      }
  
      return { distances, previousNodes };
    }
  
    getMinDistanceNode(distances, visited) {
      let minDistance = Infinity;
      let minNode = null;
  
      for (const node in distances) {
        const distance = distances[node];
        if (distance < minDistance && !visited.has(node)) {
          minDistance = distance;
          minNode = node;
        }
      }
  
      return minNode;
    }
  
    getPathTo(targetNode, previousNodes) {
      const path = [];
      while (targetNode !== null) {
        path.unshift(targetNode);
        targetNode = previousNodes[targetNode];
      }
      return path;
    }
  }
  
  // Example usage:
  const graph = new Graph();
  
  graph.addNode('A');
  graph.addNode('B');
  graph.addNode('C');
  graph.addNode('D');
  graph.addNode('E');
  
  graph.addEdge('A', 'B', 4);
  graph.addEdge('A', 'C', 2);
  graph.addEdge('B', 'C', 5);
  graph.addEdge('B', 'D', 10);
  graph.addEdge('C', 'D', 3);
  graph.addEdge('D', 'E', 7);
  graph.addEdge('E', 'A', 8);
  graph.addEdge('E', 'C', 5);
  
  const { distances, previousNodes } = graph.dijkstra('A');
  const pathToE = graph.getPathTo('E', previousNodes);
  
  console.log('Distances:', distances);
  console.log('Shortest path to E:', pathToE);
  