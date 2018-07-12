function translateX(r, centerX, radians) {
  return centerX + (r * Math.sin(radians))
}

function translateY(r, centerY, radians) {
  return centerY - (r * Math.cos(radians))
}

function getArcEnds(r, centerX, centerY, startRadians, endRadians) {
  let p1x = translateX(r, centerX, startRadians)
  let p1y = translateY(r, centerY, startRadians)
  let p2x = translateX(r, centerX, endRadians)
  let p2y = translateY(r, centerY, endRadians)
  return {p1x, p1y, p2x, p2y}
}

export {translateX, translateY, getArcEnds}
