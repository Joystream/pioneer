import React from 'react'
import styled from 'styled-components'

import MaintenanceLogo from '@/app/assets/images/MaintenanceLogo.png'
import { GlobalStyle } from '@/app/providers/GlobalStyle'
import { TextBig, TextExtraHuge } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export const MaintenanceScreen = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <img src={MaintenanceLogo} alt="Logo of Pioneer application" />
        <TextExtraHuge value bold>
          We’ll be right back!
        </TextExtraHuge>
        <TextBig lighter>
          Pioneer is currently undergoing maintenance work in order to ensure the best features and performance for our
          users.
        </TextBig>
        <TextBig lighter>
          We should be back shortly. In the meantime, feel free to
          <br />
          <a href="https://discord.gg/DE9UN3YpRP">connect with us on Discord.</a>
        </TextBig>
      </Container>
    </>
  )
}

const Container = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;

  display: grid;
  gap: 8px;
  align-content: center;
  justify-items: center;

  background-color: ${Colors.Black[900]};

  img {
    max-width: max(30%, 400px);
  }

  ${TextExtraHuge} {
    color: #fff;
    font-size: 32px;
    margin: 100px 0 8px 0;
  }

  p {
    max-width: max(30%, 400px);
    text-align: center;
    a {
      color: ${Colors.Blue[400]};
      :hover {
        text-decoration: underline;
      }
    }
  }
`
