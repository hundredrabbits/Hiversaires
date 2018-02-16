"use strict";

class Cartographer {
  constructor() {}

  start() {
    const nodeData = new Map();

    this.propagateFrom(nodeData, 1);
    this.propagateFrom(nodeData, 64, 1000); // the unused node above the gap between metamondst and circle
    this.matchEdges(nodeData);
    const dataByDepth = Array.from(nodeData.values());
    dataByDepth.sort((p, q) => {
      if (p.depth != q.depth) {
        return p.depth - q.depth;
      }
      return p.from - q.from;
    });

    nodeData.get(1).solved = true;
    nodeData.get(89).position.x = 10;
    nodeData.get(89).solved = true; // Entente entrance
    nodeData.get(107).position.y = 10;
    nodeData.get(107).solved = true; // Entente exit
    const unsolved = this.solve(nodeData, dataByDepth);
    for (const datum of unsolved) {
      console.log("Unsolved:", datum);
    }

    const colors = new Map([
      [Zone.forest, "#FF0000"],
      [Zone.studio, "#FF8000"],
      [Zone.circular, "#FFFF00"],
      [Zone.stones, "#00FF00"],
      [Zone.rainre, "#00FFFF"],
      [Zone.antechannel, "#0000FF"],
      [Zone.metamondst, "#FF00FF"],
      [Zone.capsule, "#808080"],
      [Zone.nataniev, "#C0C0C0"],
      [Zone.entente, "#FFFFFF"]
    ]);

    const nodeOutput = [];
    const edgeOutput = [];
    for (const datum of nodeData.values()) {
      nodeOutput.push(
        `<section name="node"><attribute key="id" type="int">${
          datum.nodeID
        }</attribute><attribute key="label" type="String">${
          datum.nodeID
        }</attribute><section name="graphics"><attribute key="x" type="double">${datum
          .position.x * 60}</attribute><attribute key="y" type="double">${datum
          .position.y *
          60}</attribute><attribute key="w" type="double">30.0</attribute><attribute key="h" type="double">30.0</attribute><attribute key="type" type="String">rectangle</attribute><attribute key="fill" type="String">${colors.get(
          datum.zone
        )}</attribute></section><section name="LabelGraphics"><attribute key="fontSize" type="int">14</attribute></section></section>`
      );

      for (const edge of datum.edges) {
        edgeOutput.push(
          `<section name="edge"><attribute key="source" type="int">${
            edge.from
          }</attribute><attribute key="target" type="int">${
            edge.to
          }</attribute><section name="graphics"><attribute key="fill" type="String">#000000</attribute><attribute key="targetArrow" type="String">standard</attribute></section><section name="edgeAnchor"><attribute key="xSource" type="double">0.0</attribute><attribute key="xTarget" type="double">0.0</attribute></section></section>`
        );
      }
    }

    const outputPrefix = `<?xml version="1.0" encoding="UTF-8"?><section name="xgml"><section name="graph"><attribute key="label" type="String"></attribute><attribute key="directed" type="int">1</attribute>`;
    const outputSuffix = `</section></section>`;
    const output =
      outputPrefix +
      nodeOutput.join("\n\t\t") +
      "\n\n\t\t" +
      edgeOutput.join("\n\t\t") +
      outputSuffix;
    console.clear();
    console.log(output);
  }

  matchEdges(nodeData) {
    let edgeID = 0;
    for (const datum of nodeData.values()) {
      for (const edge of datum.edges) {
        if (edge.id == null) {
          edge.id = edgeID++;
        }
      }
    }

    for (const datum of nodeData.values()) {
      for (const edge of datum.edges) {
        if (edge.match == null) {
          const otherDatum = nodeData.get(edge.to);
          for (const otherEdge of otherDatum.edges) {
            if (otherEdge.match == null && otherEdge.to == datum.nodeID) {
              edge.match = otherEdge.id;
              otherEdge.match = edge.id;
            }
          }
        }
      }
    }
  }

  solve(nodeData, dataByDepth) {
    const unsolved = [];
    for (const datum of dataByDepth) {
      datum.edges.sort(
        function(p, q) {
          const pZoneDiff = nodeData.get(p.to).zone == datum.zone ? 0 : 1;
          const qZoneDiff = nodeData.get(q.to).zone == datum.zone ? 0 : 1;
          if (pZoneDiff != qZoneDiff) {
            return pZoneDiff - qZoneDiff;
          }
          const pDiff = (p.toOrientation - p.fromOrientation + 8) % 4;
          const qDiff = (p.toOrientation - p.fromOrientation + 8) % 4;
          if (pDiff != qDiff) {
            return pDiff - qDiff;
          }
          if (p.priority != q.priority) {
            return p.priority - q.priority;
          }
          return nodeData.get(p.to).depth - nodeData.get(q.to).depth;
        }.bind(this)
      );

      const edges = datum.edges.filter(
        function(edge) {
          const toDatum = nodeData.get(edge.to);
          return toDatum.solved && toDatum.depth < datum.depth;
        }.bind(this)
      );

      for (const edge of edges) {
        if (nodeData.get(edge.to).depth < datum.depth) {
          datum.solved = true;
          this.deriveNodeSpace(datum, nodeData.get(edge.to), edge);
          break;
        }
      }
      if (!datum.solved) {
        unsolved.push(datum);
      }
    }
    return unsolved;
  }

  deriveNodeSpace(datum, otherDatum, edge) {
    datum.position.x = otherDatum.position.x;
    datum.position.y = otherDatum.position.y;
    const toOrientation = (edge.toOrientation + otherDatum.heading) % 4;
    const fromOrientation = edge.fromOrientation;
    datum.heading = (fromOrientation - toOrientation + 4) % 4;
    switch (toOrientation) {
      case 0:
        datum.position.y++;
        break;
      case 1:
        datum.position.x--;
        break;
      case 2:
        datum.position.y--;
        break;
      case 3:
        datum.position.x++;
        break;
    }
  }

  propagateFrom(nodeData, nodeID, depth = 0) {
    const recordEdge = (
      from,
      fromOrientation,
      to,
      toField,
      toOrientationField,
      priority,
      puzzleID = null
    ) => {
      return {
        from,
        fromOrientation,
        to: to[toField],
        toOrientation:
          to[toOrientationField] == null
            ? fromOrientation
            : to[toOrientationField],
        priority,
        puzzleID,
        match: null
      };
    };

    const node = nodesByID.get(nodeID);
    if (nodeData.has(nodeID)) {
      return;
    }
    const datum = {
      nodeID,
      zone: node.zone,
      depth,
      solved: false,
      position: { x: 0, y: 0 },
      heading: 0,
      edges: []
    };
    nodeData.set(nodeID, datum);
    const neighborIDs = new Set();
    for (let i = 0; i < 4; i++) {
      const subject = node.subjects[i];
      if (subject.mapIgnore) {
        continue;
      }
      if (subject.nodeID != null) {
        datum.edges.push(
          recordEdge(
            nodeID,
            i,
            subject,
            "nodeID",
            "orientation",
            subject.type == SubjectType.node ? 1 : 2,
            subject.puzzleID
          )
        );
        neighborIDs.add(subject.nodeID);
      }
      if (subject.alternateNodeID != null) {
        datum.edges.push(
          recordEdge(
            nodeID,
            i,
            subject,
            "alternateNodeID",
            "alternateOrientation",
            3,
            subject.puzzleID
          )
        );
        neighborIDs.add(subject.alternateNodeID);
      }
    }

    for (const id of neighborIDs.keys()) {
      this.propagateFrom(nodeData, id, depth + 1);
    }
  }
}
