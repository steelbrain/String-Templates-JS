'use babel'

export const DEFAULT = ['{', '}']

export class Template {
  constructor (wrappers = DEFAULT) {
    this.wrappers = wrappers
  }
  render(template, parameters = {}) {
    return String(template).replace(new RegExp(`\\${this.wrappers[0]}([\\S]+)\\${this.wrappers[1]}`, 'g'), function(orig, match) {
      if (match.indexOf('.') === -1) {
        if (parameters.hasOwnProperty(match)) {
          return parameters[match]
        } else return orig
      } else {
        let subject = parameters
        match.split('.').forEach(function(chunk) {
          if (subject.hasOwnProperty(chunk)) {
            return subject[chunk]
          } else return ''
        })
        if (typeof subject === 'object' && subject) {
          throw new Error(`Cannot use non-stringish value in template: ${match}`)
        }
        return subject.toString()
      }
    })
  }
  static create(wrappers = DEFAULT) {
    return new Template(wrappers)
  }
}
