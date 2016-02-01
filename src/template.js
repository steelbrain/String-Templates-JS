'use babel'

import {getByPath} from './helpers'
export const DEFAULT = ['{', '}']

export class Template {
  constructor (wrappers = DEFAULT) {
    this.wrappers = wrappers
  }
  render(template, parameters = {}) {
    return String(template).replace(new RegExp(`\\${this.wrappers[0]}([\\.\\w-_:\\$]+)\\${this.wrappers[1]}`, 'g'), function(orig, match) {
      return getByPath(match, parameters) || orig
    })
  }
  static create(wrappers = DEFAULT) {
    return new Template(wrappers)
  }
}
