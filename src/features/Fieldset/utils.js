const FIELD = {
  index: 0,
  mine: false,
  number: 0,
  flagged: false,
  explored: false,
  cordX: 0,
  cordY: 0,
  opened: false,
};

export const getFields = (fieldsetDimension) => {
  const fieldsQuantity = Math.pow(fieldsetDimension, 2);
  let fields = [];
  let cordX = 0;
  let cordY = 0;

  for (let index = 0; index < fieldsQuantity; index++) {
    if (cordX >= fieldsetDimension) {
      cordX = 0;
      cordY++;
    }
    fields.push({
      ...FIELD,
      index: index,
      cordX: cordX,
      cordY: cordY,
    });
    cordX++;
  }
  return fields;
};

export const getSiblingsIndexes = (field, fildsetDimension) => {
  const siblings = [];

  const countIndex = (x, y, fildsetDimension) => {
    return x + y * fildsetDimension;
  };

  const x = field.cordX;
  const y = field.cordY;
  const prevX = x - 1;
  const nextX = x + 1;
  const prevY = y - 1;
  const nextY = y + 1;

  if (nextX < fildsetDimension) {
    siblings.push(countIndex(nextX, y, fildsetDimension));
  }
  if (nextX < fildsetDimension && nextY < fildsetDimension) {
    siblings.push(countIndex(nextX, nextY, fildsetDimension));
  }
  if (nextY < fildsetDimension) {
    siblings.push(countIndex(x, nextY, fildsetDimension));
  }
  if (prevX >= 0 && nextY < fildsetDimension) {
    siblings.push(countIndex(prevX, nextY, fildsetDimension));
  }
  if (prevX >= 0) {
    siblings.push(countIndex(prevX, y, fildsetDimension));
  }
  if (prevX >= 0 && prevY >= 0) {
    siblings.push(countIndex(prevX, prevY, fildsetDimension));
  }
  if (prevY >= 0) {
    siblings.push(countIndex(x, prevY, fildsetDimension));
  }
  if (nextX < fildsetDimension && prevY >= 0) {
    siblings.push(countIndex(nextX, prevY, fildsetDimension));
  }

  return siblings;
};
