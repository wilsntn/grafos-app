import networkx as nx
import json

def convert_file_to_json(file):
    content = file.read().decode('utf-8-sig')
    graph = nx.Graph()

    for line in content.splitlines():
        nodes = line.split()
        if len(nodes) == 2:
            node1, node2 = nodes
            graph.add_edge(int(node1), int(node2))

    graph_json = nx.node_link_data(graph)
    graph_json_str = json.dumps(graph_json)

    return graph_json_str