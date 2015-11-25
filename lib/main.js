'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const DEFAULT = ['{', '}'];

class Template {
  constructor() {
    let wrappers = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT : arguments[0];

    this.wrappers = wrappers;
  }
  render(template) {
    let parameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return String(template).replace(new RegExp(`\\${ this.wrappers[0] }([\\.\\w]+)\\${ this.wrappers[1] }`, 'g'), function (orig, match) {
      if (match.indexOf('.') === -1) {
        if (parameters.hasOwnProperty(match)) {
          return parameters[match];
        } else return orig;
      } else {
        let subject = parameters;
        match.split('.').forEach(function (chunk) {
          if (subject.hasOwnProperty(chunk)) {
            subject = subject[chunk];
          } else return '';
        });
        if (typeof subject === 'object' && subject) {
          throw new Error(`Cannot use non-stringish value in template: ${ match }`);
        }
        return subject.toString();
      }
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

