import fs from "node:fs"

const meshes = []
const materials = [
  { name: "Midnight glazed stoneware", pbrMetallicRoughness: { baseColorFactor: [0.105, 0.047, 0.027, 1], metallicFactor: 0.12, roughnessFactor: 0.2 } },
  { name: "Warm espresso crema", pbrMetallicRoughness: { baseColorFactor: [0.58, 0.31, 0.105, 1], metallicFactor: 0.08, roughnessFactor: 0.28 } },
  { name: "Fresh espresso", pbrMetallicRoughness: { baseColorFactor: [0.045, 0.018, 0.008, 1], metallicFactor: 0.05, roughnessFactor: 0.22 } },
  { name: "Brushed brass detail", pbrMetallicRoughness: { baseColorFactor: [0.62, 0.39, 0.16, 1], metallicFactor: 0.76, roughnessFactor: 0.24 } },
]

function addMesh(name, geometry, material) {
  meshes.push({ name, ...geometry, material })
}

function lathe(profile, segments) {
  const positions = []
  const normals = []
  const indices = []
  for (let i = 0; i < profile.length; i++) {
    const before = profile[Math.max(0, i - 1)]
    const after = profile[Math.min(profile.length - 1, i + 1)]
    const dr = after[0] - before[0]
    const dy = after[1] - before[1]
    const normalLength = Math.hypot(dr, dy) || 1
    for (let j = 0; j <= segments; j++) {
      const angle = (j / segments) * Math.PI * 2
      const cosine = Math.cos(angle)
      const sine = Math.sin(angle)
      positions.push(profile[i][0] * cosine, profile[i][1], profile[i][0] * sine)
      normals.push((dy * cosine) / normalLength, -dr / normalLength, (dy * sine) / normalLength)
    }
  }
  for (let i = 0; i < profile.length - 1; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * (segments + 1) + j
      const b = a + segments + 1
      indices.push(a, b, b + 1, a, b + 1, a + 1)
    }
  }
  return { positions, normals, indices }
}

function disk(radius, y, segments = 64) {
  const positions = [0, y, 0]
  const normals = [0, 1, 0]
  const indices = []
  for (let j = 0; j <= segments; j++) {
    const angle = (j / segments) * Math.PI * 2
    positions.push(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
    normals.push(0, 1, 0)
  }
  for (let j = 0; j < segments; j++) indices.push(0, j + 2, j + 1)
  return { positions, normals, indices }
}

function tube(points, radius, sides = 12, closed = false) {
  const positions = []
  const normals = []
  const indices = []
  const count = points.length
  for (let i = 0; i < count; i++) {
    const previous = points[(i - 1 + count) % count]
    const next = points[(i + 1) % count]
    const tangent = [next[0] - previous[0], next[1] - previous[1], next[2] - previous[2]]
    const length = Math.hypot(...tangent) || 1
    tangent[0] /= length; tangent[1] /= length; tangent[2] /= length
    let normal = [-tangent[1], tangent[0], 0]
    const normalLength = Math.hypot(...normal) || 1
    normal = normal.map((value) => value / normalLength)
    const binormal = [0, 0, 1]
    for (let j = 0; j <= sides; j++) {
      const angle = (j / sides) * Math.PI * 2
      const cosine = Math.cos(angle)
      const sine = Math.sin(angle)
      const nx = normal[0] * cosine
      const ny = normal[1] * cosine
      const nz = binormal[2] * sine
      positions.push(points[i][0] + nx * radius, points[i][1] + ny * radius, points[i][2] + nz * radius)
      const nLength = Math.hypot(nx, ny, nz) || 1
      normals.push(nx / nLength, ny / nLength, nz / nLength)
    }
  }
  const rings = closed ? count : count - 1
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < sides; j++) {
      const a = i * (sides + 1) + j
      const b = ((i + 1) % count) * (sides + 1) + j
      indices.push(a, b, b + 1, a, b + 1, a + 1)
    }
  }
  return { positions, normals, indices }
}

const cupProfile = [
  [0, -0.82], [0.53, -0.82], [0.63, -0.79], [0.69, -0.7], [0.73, -0.52],
  [0.83, -0.12], [0.94, 0.35], [0.985, 0.61], [0.985, 0.68],
  [0.955, 0.72], [0.855, 0.71], [0.83, 0.62], [0.78, 0.34],
  [0.69, -0.08], [0.58, -0.52], [0.52, -0.61], [0, -0.61],
]
addMesh("Hand-thrown espresso cup", lathe(cupProfile, 72), 0)

const saucerProfile = [[0, -0.94], [0.48, -0.94], [0.78, -0.92], [1.05, -0.87], [1.23, -0.81], [1.28, -0.77], [1.26, -0.73], [1.2, -0.74], [1.05, -0.8], [0.78, -0.84], [0.48, -0.85], [0, -0.85]]
addMesh("Matching sculpted saucer", lathe(saucerProfile, 72), 0)
addMesh("Dark espresso surface", disk(0.815, 0.635), 2)

const cremaPoints = Array.from({ length: 80 }, (_, index) => {
  const angle = (index / 80) * Math.PI * 2
  return [Math.cos(angle) * 0.79, 0.64, Math.sin(angle) * 0.79]
})
addMesh("Crema edge", tube(cremaPoints, 0.016, 8, true), 1)

const handlePoints = Array.from({ length: 48 }, (_, index) => {
  const angle = (index / 48) * Math.PI * 2
  return [1.02 + Math.sin(angle) * 0.43, -0.04 + Math.cos(angle) * 0.39, 0]
})
addMesh("Sculpted cup handle", tube(handlePoints, 0.083, 14, true), 0)

const rimPoints = Array.from({ length: 96 }, (_, index) => {
  const angle = (index / 96) * Math.PI * 2
  return [Math.cos(angle) * 0.973, 0.697, Math.sin(angle) * 0.973]
})
addMesh("Fine brass rim", tube(rimPoints, 0.009, 6, true), 3)

const binaryParts = []
const bufferViews = []
const accessors = []
const gltfMeshes = []
let byteOffset = 0

function alignBinary() {
  const padding = (4 - (byteOffset % 4)) % 4
  if (padding) {
    const bytes = Buffer.alloc(padding)
    binaryParts.push(bytes)
    byteOffset += padding
  }
}

function addBuffer(data, componentType, type, target, min, max) {
  alignBinary()
  const array = componentType === 5123 ? Uint16Array.from(data) : Float32Array.from(data)
  const bytes = Buffer.from(array.buffer, array.byteOffset, array.byteLength)
  const viewIndex = bufferViews.length
  bufferViews.push({ buffer: 0, byteOffset, byteLength: bytes.length, target })
  binaryParts.push(bytes)
  byteOffset += bytes.length
  const accessor = { bufferView: viewIndex, componentType, count: data.length / (type === "SCALAR" ? 1 : 3), type }
  if (min) accessor.min = min
  if (max) accessor.max = max
  accessors.push(accessor)
  return accessors.length - 1
}

for (const mesh of meshes) {
  const positionMin = [Infinity, Infinity, Infinity]
  const positionMax = [-Infinity, -Infinity, -Infinity]
  for (let index = 0; index < mesh.positions.length; index += 3) {
    for (let axis = 0; axis < 3; axis++) {
      positionMin[axis] = Math.min(positionMin[axis], mesh.positions[index + axis])
      positionMax[axis] = Math.max(positionMax[axis], mesh.positions[index + axis])
    }
  }
  const positionAccessor = addBuffer(mesh.positions, 5126, "VEC3", 34962, positionMin, positionMax)
  const normalAccessor = addBuffer(mesh.normals, 5126, "VEC3", 34962)
  const indexAccessor = addBuffer(mesh.indices, 5123, "SCALAR", 34963)
  gltfMeshes.push({
    name: mesh.name,
    primitives: [{ attributes: { POSITION: positionAccessor, NORMAL: normalAccessor }, indices: indexAccessor, material: mesh.material, mode: 4 }],
  })
}

const binary = Buffer.concat(binaryParts)
const gltf = {
  asset: { version: "2.0", generator: "Brew & Beyond studio model generator" },
  scene: 0,
  scenes: [{ nodes: gltfMeshes.map((_, index) => index) }],
  nodes: gltfMeshes.map((mesh, index) => ({ name: mesh.name, mesh: index })),
  meshes: gltfMeshes,
  materials,
  accessors,
  bufferViews,
  buffers: [{ byteLength: binary.length }],
}
let jsonChunk = Buffer.from(JSON.stringify(gltf), "utf8")
const jsonPadding = (4 - (jsonChunk.length % 4)) % 4
if (jsonPadding) jsonChunk = Buffer.concat([jsonChunk, Buffer.alloc(jsonPadding, 0x20)])
const binPadding = (4 - (binary.length % 4)) % 4
const binChunk = binPadding ? Buffer.concat([binary, Buffer.alloc(binPadding)]) : binary
const totalLength = 12 + 8 + jsonChunk.length + 8 + binChunk.length
const header = Buffer.alloc(12)
header.writeUInt32LE(0x46546c67, 0)
header.writeUInt32LE(2, 4)
header.writeUInt32LE(totalLength, 8)
const jsonHeader = Buffer.alloc(8)
jsonHeader.writeUInt32LE(jsonChunk.length, 0)
jsonHeader.writeUInt32LE(0x4e4f534a, 4)
const binHeader = Buffer.alloc(8)
binHeader.writeUInt32LE(binChunk.length, 0)
binHeader.writeUInt32LE(0x004e4942, 4)
fs.writeFileSync(new URL("./public/espresso-cup.glb", import.meta.url), Buffer.concat([header, jsonHeader, jsonChunk, binHeader, binChunk]))
console.log(`Wrote espresso-cup.glb (${totalLength} bytes, ${meshes.length} meshes)`)
