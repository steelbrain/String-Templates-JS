'use babel'

import {Template, DEFAULT} from './template'

export class Builder {
  constructor(contents = '', wrappers = DEFAULT) {
    this.contents = contents
    this.wrappers = wrappers
    this.template = null
  }
  add(content) {
    this.contents += typeof content === 'string' ? content : String(content)
    return this
  }
  addLine(content) {
    this.contents += typeof content === 'string' ? content : String(content)
    this.contents += '\n'
    return this
  }
  render(content, parameters = null) {
    return this.add(parameters === null ? content : this.getTemplate().render(content, parameters))
  }
  renderLine(content, parameters = null) {
    return this.addLine(parameters === null ? content : this.getTemplate().render(content, parameters))
  }
  getTemplate() {
    if (this.template) {
      return this.template
    } else return this.template = Template.create(this.wrappers)
  }
  toString() {
    return this.contents
  }
  static create(contents = '', wrappers = DEFAULT) {
    return new Builder(contents, wrappers)
  }
}
