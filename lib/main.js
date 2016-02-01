'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const CHUNK_TEST_REGEX = /:/;
const CHUNK_SPLIT_REGEX = /:/g;

function getByPath(path, container) {
  let parameters = container;
  const parsed = parsePath(path);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = parsed.key.split('.')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const chunk = _step.value;

      if (parameters.hasOwnProperty(chunk)) {
        parameters = parameters[chunk];
      } else return null;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (parameters && typeof parameters === 'object') {
    throw new Error(`Cannot use non-stringish value in template: ${ path }`);
  }
  parameters = parameters.toString();
  if (typeof parsed.start === 'number' && typeof parsed.end === 'number') {
    return parameters.slice(parsed.start, parsed.end);
  } else if (typeof parsed.start === 'number') {
    return parameters.slice(parsed.start);
  } else return parameters;
}

function parsePath(path) {
  if (!CHUNK_TEST_REGEX.test(path)) {
    return { key: path, start: null, end: null };
  }
  const parts = path.split(CHUNK_SPLIT_REGEX);
  if (parts.length === 2) {
    return { key: parts[0], start: parseInt(parts[1]) || 0, end: null };
  } else if (parts.length === 3) {
    return { key: parts[0], start: parseInt(parts[1]) || 0, end: parseInt(parts[2]) || 0 };
  }
  return null;
}

const DEFAULT = ['{', '}'];

class Template {
  constructor() {
    let wrappers = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT : arguments[0];

    this.wrappers = wrappers;
  }
  render(template) {
    let parameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return String(template).replace(new RegExp(`\\${ this.wrappers[0] }([\\.\\w-_:\\$]+)\\${ this.wrappers[1] }`, 'g'), function (orig, match) {
      return getByPath(match, parameters) || orig;
    });
  }
  static create() {
    let wrappers = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT : arguments[0];

    return new Template(wrappers);
  }
}

class Builder {
  constructor() {
    let contents = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    let wrappers = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT : arguments[1];

    this.contents = contents;
    this.wrappers = wrappers;
    this.template = null;
  }
  add(content) {
    this.contents += typeof content === 'string' ? content : String(content);
    return this;
  }
  addLine(content) {
    this.contents += typeof content === 'string' ? content : String(content);
    this.contents += '\n';
    return this;
  }
  render(content) {
    let parameters = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return this.add(parameters === null ? content : this.getTemplate().render(content, parameters));
  }
  renderLine(content) {
    let parameters = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return this.addLine(parameters === null ? content : this.getTemplate().render(content, parameters));
  }
  getTemplate() {
    if (this.template) {
      return this.template;
    } else return this.template = Template.create(this.wrappers);
  }
  toString() {
    return this.contents;
  }
  static create() {
    let contents = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    let wrappers = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT : arguments[1];

    return new Builder(contents, wrappers);
  }
}

exports.Template = Template;
exports.Builder = Builder;

