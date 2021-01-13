import styled from 'styled-components'

export const Page = styled.div`
  display: grid;
  grid-template-columns: 255px 1fr;
  grid-template-rows: 3.25em auto auto 1fr 4.5em;
  grid-template-areas:
    'navbar topbar topbar'
    'navbar summary summary'
    'navbar options options'
    'navbar assets assets'
    'navbar footer footer';
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`
