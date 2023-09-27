<?php
class Dijkstra
{
    public function shortestPath($graph, $start, $end)
    {
        $distances = [];
        $visited = [];
        $previous = [];
        $queue = new SplPriorityQueue();

        foreach ($graph as $vertex => $adjacent) {
            $distances[$vertex] = INF;
            $previous[$vertex] = null;
        }

        $distances[$start] = 0;
        $queue->insert($start, 0);

        while (!$queue->isEmpty()) {
            $current = $queue->extract();
            if ($current === $end) {
                $path = [];
                while ($previous[$current] !== null) {
                    array_unshift($path, $current);
                    $current = $previous[$current];
                }
                array_unshift($path, $start);
                return ['distance' => $distances[$end], 'path' => $path];
            }

            if (isset($visited[$current])) {
                continue;
            }

            $visited[$current] = true;

            foreach ($graph[$current] as $neighbor => $weight) {
                $alt = $distances[$current] + $weight;
                if ($alt < $distances[$neighbor]) {
                    $distances[$neighbor] = $alt;
                    $previous[$neighbor] = $current;
                    $queue->insert($neighbor, -$alt);
                }
            }
        }

        return ['distance' => -1, 'path' => []];
    }
}

// Example usage:
$graph = [
    'A' => ['B' => 4, 'C' => 2],
    'B' => ['A' => 4, 'C' => 5, 'D' => 10],
    'C' => ['A' => 2, 'B' => 5, 'D' => 7],
    'D' => ['B' => 10, 'C' => 7],
];

$dijkstra = new Dijkstra();
$result = $dijkstra->shortestPath($graph, 'A', 'D');
echo 'Shortest distance: ' . $result['distance'] . PHP_EOL;
echo 'Shortest path: ' . implode(' -> ', $result['path']) . PHP_EOL;
?>
