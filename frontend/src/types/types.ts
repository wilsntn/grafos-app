export interface IGraphConverterResponse {
  directed: boolean;
  multigraph: boolean;
  graph: {};
  nodes: {
    id: string;
  }[];
  links: {
    source: string;
    target: string;
  }[];
}
