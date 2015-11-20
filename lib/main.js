'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const DEFAULT = ['{', '}'];

class Template {
  constructor(wrappers = DEFAULT) {
    this.wrappers = wrappers;
  }
  render(template, parameters = {}) {
    return String(template).replace(`/\\${ this.wrappers[0] }([\w\.]+)${ this.wrappers[1] }\\/`, function (matches) {
      const match = matches[1];
      if (match.indexOf('.') === -1) {
        if (parameters.hasOwnProperty(match)) {
          return parameters[match];
        } else return matches[0];
      } else {
        let subject = parameters;
        match.split('.').forEach(function (chunk) {
          if (subject.hasOwnProperty(chunk)) {
            return subject[chunk];
          } else return '';
        });
        if (typeof subject === 'object' && subject) {
          throw new Error(`Cannot use non-stringish value in template: ${ match }`);
        }
        return subject.toString();
      }
    });
  }
  static create(wrappers = DEFAULT) {
    return new Template(wrappers);
  }
}

class Builder {
  constructor(contents = '', wrappers = DEFAULT) {
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
  render(content, parameters = null) {
    return this.add(parameters === null ? content : this.getTemplate().render(content, parameters));
  }
  renderLine(content, parameters = null) {
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
  static create(contents = '', wrappers = DEFAULT) {
    return new Builder(contents, wrappers);
  }
}

exports.Template = Template;
exports.Builder = Builder;

