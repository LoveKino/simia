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

function Measure(type, params, deps) {
  this.type = type;
  this.params = params || [];
  this.deps = deps || [];
  this.id = measureIdCounter++;

  this.value = null;
}

const FIXED = 0;
const MORE = 1;
const LESS = 2;
const RATIO = 3;
const SUM = 4;
const REDUCE = 5;

// TODO circle detection
Measure.prototype.resolve = function(cacheMap) {
  // check cache first
  if (cacheMap[this.id] !== undefined) {
    return cacheMap[this.id];
  }

  switch (this.type) {
    case FIXED:
      this.value = this.params[0];
      break;

    case MORE:
      this.value = this.deps[0].resolve(cacheMap) + this.params[0];
      break;

    case LESS:
      this.value = this.deps[0].resolve(cacheMap) - this.params[0];
      break;

    case RATIO:
      this.value = this.deps[0].resolve(cacheMap) * this.params[0];
      break;

    case SUM:
      this.value = this.deps.reduce((prev, dep) => {
        return prev + dep.resolve(cacheMap);
      }, 0);
      break;

    case REDUCE:
      this.value = this.params[0](this.deps.map((dep) => dep.resolve(cacheMap)));
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
const measureContext = () => {
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
    return new Measure(RATIO, [percentage], [target]);
  };

  // sum of targets
  const sum = (targets) => {
    return new Measure(SUM, [], targets);
  };

  // general reduce
  const reduce = (targets, fn) => {
    return new Measure(REDUCE, [fn], targets);
  };

  return {
    fixed,
    ratio,
    sum,
    reduce,
    more,
    less
  };
};

module.exports = {
  measureContext
};
