const node = (data, parentNode = null, lvl = 0) => {
  return { data, parentNode, lvl };
};

const queue = () => {
  const items = {};
  let headIndex = 0;
  let tailIndex = 0;

  const enqueue = (item) => {
    items[tailIndex] = item;
    tailIndex++;
  };

  const isEmpty = () => {
    return tailIndex === headIndex;
  };

  const size = () => {
    return tailIndex - headIndex;
  };

  const dequeue = () => {
    if (isEmpty()) return null;
    let item = items[headIndex];
    delete items[headIndex];
    headIndex++;
    return item;
  };

  return {
    enqueue,
    isEmpty,
    size,
    dequeue,
  };
};

function getDiscoveredNodes(coordNode) {
  const possibleNodes = [];
  let x = coordNode.data[0];
  let y = coordNode.data[1];
  for (let i = 0; i < 8; i++) {
    switch (i) {
      case 0:
        possibleNodes.push([x + 1, y + 2]);
        break;
      case 1:
        possibleNodes.push([x + 2, y + 1]);
        break;
      case 2:
        possibleNodes.push([x + 2, y - 1]);
        break;
      case 3:
        possibleNodes.push([x + 1, y - 2]);
        break;
      case 4:
        possibleNodes.push([x - 1, y - 2]);
        break;
      case 5:
        possibleNodes.push([x - 2, y - 1]);
        break;
      case 6:
        possibleNodes.push([x - 2, y + 1]);
        break;
      case 7:
        possibleNodes.push([x - 1, y + 2]);
        break;
    }
  }

  const discoveredNodes = possibleNodes
    .filter(([x, y]) => {
      if (0 <= x && x <= 7 && 0 <= y && y <= 7) {
        return true;
      } else {
        return false;
      }
    })
    //coordNode.lvl++
    .map((coord) => node(coord, coordNode, coordNode.lvl + 1));

  return discoveredNodes;
}

const getPath = (finalNode) => {
  let tmpNode = finalNode;
  const path = [tmpNode.data];

  while (tmpNode.parentNode !== null) {
    tmpNode = tmpNode.parentNode;
    path.push(tmpNode.data);
  }

  return path.reverse();
};

function knightMoves(startCoord, targetCoord) {
  let rootNode = node(startCoord);
  let q = queue();

  q.enqueue(rootNode);

  while (!q.isEmpty()) {
    let currentNode = q.dequeue();

    if (
      currentNode.data[0] === targetCoord[0] &&
      currentNode.data[1] === targetCoord[1]
    ) {
      const path = getPath(currentNode);

      return {
        status: `You made it in ${currentNode.lvl} moves!  Here's your path:`,
        path,
      };
    } else {
      const discoveredNodes = getDiscoveredNodes(currentNode);
      discoveredNodes.forEach((item) => q.enqueue(item));
    }
  }
}

console.log(knightMoves([0, 0], [3, 3]));

console.log(knightMoves([3, 3], [0, 0]));

console.log(knightMoves([0, 0], [7, 7]));

console.log(knightMoves([3, 3], [4, 3]));
