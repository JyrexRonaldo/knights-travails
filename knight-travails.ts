type inputCoordinate = [x: number, y: number];

interface CoordinateType {
  parentCoordinate: CoordinateType | null;
  x: number;
  y: number;
}

function getAdjascentCoordinate(coordinate: CoordinateType) {
  let adjascentCoordinates: CoordinateType[] = [];
  //Done
  if (
    coordinate.x + 2 >= 0 &&
    coordinate.x + 2 <= 7 &&
    coordinate.y + 1 >= 0 &&
    coordinate.y + 1 <= 7
  ) {
    adjascentCoordinates.push({
      parentCoordinate: coordinate,
      x: coordinate.x + 2,
      y: coordinate.y + 1,
    });
  }
  //Done
  if (
    coordinate.x + 1 >= 0 &&
    coordinate.x + 1 <= 7 &&
    coordinate.y + 2 >= 0 &&
    coordinate.y + 2 <= 7
  ) {
    adjascentCoordinates.push({
      parentCoordinate: coordinate,
      x: coordinate.x + 1,
      y: coordinate.y + 2,
    });
  }
  //Done
  if (
    coordinate.x - 1 >= 0 &&
    coordinate.x - 1 <= 7 &&
    coordinate.y + 2 >= 0 &&
    coordinate.y + 2 <= 7
  ) {
    adjascentCoordinates.push({
      parentCoordinate: coordinate,
      x: coordinate.x - 1,
      y: coordinate.y + 2,
    });
  }
  //Done
  if (
    coordinate.x - 2 >= 0 &&
    coordinate.x - 2 <= 7 &&
    coordinate.y + 1 >= 0 &&
    coordinate.y + 1 <= 7
  ) {
    adjascentCoordinates.push({
      parentCoordinate: coordinate,
      x: coordinate.x - 2,
      y: coordinate.y + 1,
    });
  }
  //Done
  if (
    coordinate.x - 2 >= 0 &&
    coordinate.x - 2 <= 7 &&
    coordinate.y - 1 >= 0 &&
    coordinate.y - 1 <= 7
  ) {
    adjascentCoordinates.push({
      parentCoordinate: coordinate,
      x: coordinate.x - 2,
      y: coordinate.y - 1,
    });
  }
  //Done
  if (
    coordinate.x - 1 >= 0 &&
    coordinate.x - 1 <= 7 &&
    coordinate.y - 2 >= 0 &&
    coordinate.y - 2 <= 7
  ) {
    adjascentCoordinates.push({
      parentCoordinate: coordinate,
      x: coordinate.x - 1,
      y: coordinate.y - 2,
    });
  }
  //Done
  if (
    coordinate.x + 1 >= 0 &&
    coordinate.x + 1 <= 7 &&
    coordinate.y - 2 >= 0 &&
    coordinate.y - 2 <= 7
  ) {
    adjascentCoordinates.push({
      parentCoordinate: coordinate,
      x: coordinate.x + 1,
      y: coordinate.y - 2,
    });
  }
  //Done
  if (
    coordinate.x + 2 >= 0 &&
    coordinate.x + 2 <= 7 &&
    coordinate.y - 1 >= 0 &&
    coordinate.y - 1 <= 7
  ) {
    adjascentCoordinates.push({
      parentCoordinate: coordinate,
      x: coordinate.x + 2,
      y: coordinate.y - 1,
    });
  }
  return adjascentCoordinates;
}

function knightMoves(
  startCoord: inputCoordinate,
  targetCoord: inputCoordinate,
) {
  if (
    startCoord[0] < 0 ||
    startCoord[1] > 7 ||
    targetCoord[0] < 0 ||
    targetCoord[1] > 7
  ) {
    throw new Error("input coordinates are out of bounds");
  }
  let startCoordinate = {
    parentCoordinate: null,
    x: startCoord[0],
    y: startCoord[1],
  };
  let targetCoordinate = {
    parentCoordinate: null,
    x: targetCoord[0],
    y: targetCoord[1],
  };
  const path: inputCoordinate[] = [];

  let q: CoordinateType[] = [];
  q.push(startCoordinate);

  while (q.length !== 0) {
    let currentCoord = q.shift();

    if (currentCoord) {
      if (
        currentCoord.x === targetCoordinate.x &&
        currentCoord.y === targetCoordinate.y
      ) {
        while (currentCoord.parentCoordinate !== null) {
          path.push([currentCoord.x, currentCoord.y]);
          currentCoord = currentCoord.parentCoordinate;
        }
        path.push(startCoord);
        path.reverse();
        console.log(
          `You made it in ${path.length - 1} moves!  Here's your path`,
        );
        path.forEach((item) => console.log(item));
        return;
      } else {
        const adjascentCoordinates = getAdjascentCoordinate(currentCoord);
        adjascentCoordinates.forEach((coordinate) => {
          q.push(coordinate);
        });
      }
    }
  }
}

export default knightMoves;
