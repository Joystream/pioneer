import styled from 'styled-components'
import { PageTabs } from '../../components/page/PageTabs'

export const MyProfile = styled.div`
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
export const MyProfileContent = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px auto;
  grid-template-areas:
    'accountstabs'
    'accountstable';
  grid-row-gap: 18px;
  width: 100%;
`
