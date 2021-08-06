import styled from 'styled-components'

export const Page = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 226px 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'navbar page';
  grid-column-gap: 24px;
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding-right: 24px;
  overflow-y: scroll;
  overflow-x: hidden;
`
