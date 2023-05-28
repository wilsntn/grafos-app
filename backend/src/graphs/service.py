import os
import networkx as nx

def convert_file_to_json(file_path):
    graph = nx.read_edgelist(file_path, create_using=nx.Graph(), nodetype = int)
    graph_json = nx.node_link_data(graph)
    return graph_json