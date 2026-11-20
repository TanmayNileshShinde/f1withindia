export type ModuleId = 'module1' | 'module2' | 'module3' | 'module4';

export interface DriverData {
  number: number;
  code: string;
  name: string;
  team: string;
  speed: number;
  color: string;
}

export interface LapNode {
  id: number;
  lapNumber: number;
  lapTime: string;
  tyre: 'SOFT' | 'MEDIUM' | 'HARD';
  event?: string;
  next?: LapNode | null;
}

export interface TreeNode {
  value: number;
  label: string;
  left?: TreeNode | null;
  right?: TreeNode | null;
  height?: number;
}

export interface GraphNode {
  id: string;
  name: string;
  sector: 1 | 2 | 3;
  type: 'CORNER' | 'STRAIGHT' | 'DRS_ZONE';
  neighbors: string[];
}
