import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
 interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Account Summary',
    children: [{name: 'Fund T/F to Own Account'}, {name: 'Open FIxed Depoist'}, {name: 'Open Recurring Deposit'}],
  },
  {
    name: 'Transact',
    children: [
      {
        name: 'A/c - Statement',
        children: [{name: 'View Account Balance'}, {name: 'A/c Statement - Last 5 Years'}],
      },
      {
        name: 'Fixed Deposit Summary',
        children: [{name: 'View Check status'}, {name: 'TDS Incuiry'}],
      },
    ],
  },
  {
    name: 'Enquire',
    children: [
      {
        name: 'Generate MMID',
        children: [{name: 'Retrieve MMID'}, {name: 'Cancel MMID'}],
      },
      {
        name: 'Orange',
        children: [{name: 'SMART Slips'}, {name: 'Retrieve MMID'}],
      },
    ],
  },
  {
    name: 'Request',
    children: [
      {
        name: 'View Account Balance',
        children: [{name: 'A/c Statement - Last 5 Years'}, {name: 'A/c Statement - Last 5 Years'}],
      },
      {
        name: 'SMART Slips',
        children: [{name: 'Retrieve MMID'}, {name: 'View Account Balance'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  ngOnInit(): void {
  }

}
