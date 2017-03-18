String-Templates-JS
===================

[![Greenkeeper badge](https://badges.greenkeeper.io/steelbrain/String-Templates-JS.svg)](https://greenkeeper.io/)

String-Templates-JS is the JS port of my String-Templates module. It's lightweight and usable almost everywhere.

#### API
```
export class Template {
  constructor(wrappers = ['{', '}']): Template
  render(content, parameters = {}): String
  static create(wrappers = DEFAULT): Template
}
export class Builder {
  constructor(contents = '', wrappers = DEFAULT): Builder
  add(content): this
  addLine(content): this
  render(content, parameters = null): this
  renderLine(content, parameters = null): this
  toString(): String
  static create(contents = '', wrappers = DEFAULT): Builder
}
```

#### LICENSE
This project is licensed under the terms of MIT License, See the LICENSE file for more info
