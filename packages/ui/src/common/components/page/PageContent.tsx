import styled from 'styled-components'

export const PageContent = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  grid-area: page;
  padding: 40px 0;
`

export const ContentWithSidepanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 256px;
  grid-column-gap: 24px;
  width: 100%;
`

export const MainPanel = styled.div`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
  height: fit-content;
`

export const SidePanel = styled.aside`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 256px;
  height: fit-content;
`

export const ContentWithTabs = styled(MainPanel)`
  grid-row-gap: 16px;
`
