/**
 * measure model
 *
 *   dependency, eg: shape A width is based on width B
 *
 *   DG = (V, G), F[p] <- g(0, F[G(p)]), p ∈ V. There is no cycle in DG.
 */

/**
 * measure = {
 *   type,
 *   params: [],
 *   deps: []
 * }
 */
let measureIdCounter = 0;

function Measure(type, params) {
  this.type = type;
  this.params = params || [];
  this.deps = [];
  this.ins = [];
  this.id = measureIdCounter++; // unique id for a Measure object

  this.value = null;
}

const FIXED = 0;
const MORE = 1;
const LESS = 2;
const RATIO = 3;
const SUM = 4;
const MIN = 5;
const MAX = 6;
const REDUCE = 7;

// two way connections
Measure.prototype.connect = function(dep) {
  this.deps.push(dep);
  dep.ins.push(this);
};

Measure.prototype.resolve = function(cacheMap, seen) {
  // check cache first
  if (cacheMap[this.id] !== undefined) {
    return cacheMap[this.id];
  }

  if (seen[this.id]) { // cycle
    throw new Error(`cicle detected at measure resolving. Id of current measure is ${this.id}`);
  }
  seen[this.id] = 1;

  switch (this.type) {
    case FIXED:
      this.value = this.params[0];
      break;

    case MORE:
      this.value = this.deps[0].resolve(cacheMap, seen) + this.params[0];
      break;

    case LESS:
      this.value = this.deps[0].resolve(cacheMap, seen) - this.params[0];
      break;

    case RATIO:
      this.value = this.deps[0].resolve(cacheMap, seen) * this.params[0];
      break;

    case SUM:
      this.value = this.deps.reduce((prev, dep) => {
        return prev + dep.resolve(cacheMap, seen);
      }, 0);
      break;

    case MIN:
      this.value = Math.min(...this.deps.map((dep) => dep.resolve(cacheMap, seen), 0));
      break;

    case MAX:
      this.value = Math.max(...this.deps.map((dep) => dep.resolve(cacheMap, seen), 0));
      break;

    case REDUCE:
      this.value = this.params[0](this.deps.map((dep) => dep.resolve(cacheMap, seen)));
      break;

    default:
      throw new Error('unsupport type of measure');
  }

  // save to cache
  cacheMap[this.id] = this.value;
  return this.value;
};

// TODO update a measure

// TODO type checking
// fixed size
const fixed = (size) => {
  return new Measure(FIXED, [size]);
};

const more = (size) => {
  return new Measure(MORE, [size]);
};

const less = (size) => {
  return new Measure(LESS, [size]);
};

// proportion of target
const ratio = (target, percentage) => {
  const m = new Measure(RATIO, [percentage], [target]);
  m.connect(target);
  return m;
};

// sum of targets
const sum = (targets) => {
  const m = new Measure(SUM, []);
  targets.forEach((target) => {
    m.connect(target);
  });
  return m;
};

const min = (targets) => {
  const m = new Measure(MIN, []);
  targets.forEach((target) => {
    m.connect(target);
  });
  return m;
};

const max = (targets) => {
  const m = new Measure(MAX, []);
  targets.forEach((target) => {
    m.connect(target);
  });
  return m;
};

// general reduce
const reduce = (targets, fn) => {
  const m = new Measure(REDUCE, [fn]);
  targets.forEach((target) => {
    m.connect(target);
  });
  return m;
};

module.exports = {
  fixed,
  ratio,
  sum,
  reduce,
  more,
  less,
  min,
  max
};
