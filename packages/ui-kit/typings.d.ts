declare module '*.module.css'

declare module '*.jpg'

declare module '*.svg' {
  import React = require('react')
  const content: React.FunctionComponent<React.HTMLAttributes<SVGElement>>
  export default content
}
