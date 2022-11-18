import styled from 'styled-components'

export const Page = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 226px 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'navbar page';
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

export const Screen = styled.div`
  grid-area: page;
`
