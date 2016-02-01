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

    it('replaces keeps non-found as is', function() {
      const template = new Template()
      expect(template.render('Hey {come.on}', {})).toBe('Hey {come.on}')
    })

    it('supports substrings', function() {
      const template = new Template()
      expect(template.render('Hey {come.on:1}', {come: {on: 'Wow'}})).toBe('Hey ow')
      expect(template.render('Hey {come.on:1:2}', {come: {on: 'Wow'}})).toBe('Hey o')
      expect(template.render('Hey {come.on:1:3}', {come: {on: 'Wow'}})).toBe('Hey ow')
      expect(template.render('Hey {come.on:2}', {come: {on: 'Wow'}})).toBe('Hey w')
    })
  })

})
