import { EquilateralTriangles } from '~/src/components/equilateralTriangles'

if (process.env.NODE_ENV === 'development')
  require('~/src/style/patterns/equilateral-triangles.scss')

new EquilateralTriangles({ran: 6, size: 10, mount: document.getElementById('root')})