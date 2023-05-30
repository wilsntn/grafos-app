import os
import networkx as nx

def convert_file_to_json(file_path):
    fh = open(file_path, "rb")
    G = nx.read_edgelist(fh)
    graph_json = nx.node_link_data(G)
    fh.close()
    return graph_json
    