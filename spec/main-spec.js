'use babel'

import {Builder, Template} from '../src/main'

describe('String Templates', function() {

  describe('Template', function() {
    it('supports normal gets', function() {
      const template = new Template()
      expect(template.render('Hey {some}', {some: 'Thing'})).toBe('Hey Thing')
    })

    it('supports deep gets', function() {
      const template = new Template()
      expect(template.render('Hey {come.on}', {come: {on: 'There'}})).toBe('Hey There')
      expect(template.render('Hey {come.on} {first.second.third.forth}', {
        come: {on: 'There'},
        first: {second: {third: {forth: 'fifth'}}}
      })).toBe('Hey There fifth')
    })
  })

})
