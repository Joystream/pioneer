import styled from 'styled-components'
import { PageTabs } from '../../components/page/PageTabs'

export const Groups = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 24px;
  width: 100%;
`

export const ProfileSummary = styled.div`
  display: flex;
  flex-direction: column;

  ${PageTabs} {
    margin-bottom: 24px;
  }
`

export const WorkingGroupsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 108px;
  grid-row-gap: 8px;
  width: 100%;
`
