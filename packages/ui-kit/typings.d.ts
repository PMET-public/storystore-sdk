declare module '*.module.css'

declare module '*.svg' {
  import React = require('react')
  const content: React.FunctionComponent<React.HTMLAttributes<SVGElement>>
  export default content
}
