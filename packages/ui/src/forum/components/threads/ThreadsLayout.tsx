import styled from 'styled-components'

export const ThreadsLayoutSpacing = '24px'

export const ThreadsLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${ThreadsLayoutSpacing};
  row-gap: 16px;
  width: 100%;
  max-width: 100%;
  height: fit-content;
  overflow: hidden;
`
