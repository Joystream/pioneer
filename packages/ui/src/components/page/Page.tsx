import styled from 'styled-components'

export const Page = styled.div`
  display: grid;
  grid-template-columns: 226px 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'navbar page'
    'navbar page';
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`
