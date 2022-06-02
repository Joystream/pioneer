import React from 'react'
import styled from 'styled-components'

import Image from '@/app/assets/images/FMImage.png'
import { ButtonPrimary, ButtonSecondary, ButtonsGroup, CloseButton } from '@/common/components/buttons'
import { Checkbox } from '@/common/components/forms'
import { USFlag } from '@/common/components/icons/USFlag'
import { Link } from '@/common/components/Link'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useToggle } from '@/common/hooks/useToggle'

export const FMBanner = () => {
  const [shouldHide, setShouldHide] = useLocalStorage<boolean>('hideFMBanner')
  const [showBanner, toggle] = useToggle(!shouldHide ?? true)

  return (
    <Container open={showBanner}>
      <TopContainer>
        <FMImage src={Image} />
        <TextBox>
          <TextExtraHuge value bold>
            Joystream platform currently runs on testnet
          </TextExtraHuge>
          <TextMedium>
            Testnet participants <StyledLink>earn</StyledLink> a combination of our testnet token{' '}
            <StyledLink>$tJOY</StyledLink>, and allocation of our mainnet token $JOY (which will come to life upon
            mainnet launch).
          </TextMedium>
          <TextMedium>
            $tJOY can be <StyledLink>converted</StyledLink> to BCH, (Bitcoin cash cryptocurrency) immediately, whereas
            $JOY will be allocated shortly after mainnet launch, assuming the contributor has reached the{' '}
            <StyledLink>Founding Member</StyledLink> status, buy accruing $15k USD worth of $JOY.
          </TextMedium>
          <TextMedium>
            $tJOY balances have no relationship to mainnet $JOY balances, there will be no conversion of any kind.
          </TextMedium>
          <TextMedium>
            <USFlag />
            US residents are not eligible for JOY tokens.
          </TextMedium>
        </TextBox>
        <CloseButton onClick={toggle} />
      </TopContainer>
      <BottomContainer>
        <Checkbox isChecked={shouldHide} onChange={(value) => setShouldHide(value)} id="dont-show-checkbox">
          Don't show this again
        </Checkbox>
        <ButtonsGroup>
          <ButtonSecondary size="medium">Speak with Community Integrators</ButtonSecondary>
          <ButtonPrimary size="medium">Learn more</ButtonPrimary>
        </ButtonsGroup>
      </BottomContainer>
    </Container>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: Inter;
  font-size: 14px;
`

const Container = styled.div<{ open: boolean }>`
  display: ${({ open }) => !open && 'none'};
  background-color: ${Colors.Black[800]};
  border-radius: ${BorderRad.l};
  width: 80%;
  position: absolute;
  bottom: 100px;
  right: 20px;
  z-index: 999;
`

const TopContainer = styled.div`
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
  padding: 24px;
  border-bottom: 1px solid ${Colors.Black[700]};
`

const BottomContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 10px 24px;
  align-items: center;

  label {
    color: white;
  }

  svg {
    color: white;
  }
`

const TextBox = styled.div`
  display: grid;
  row-gap: 15px;
  flex: 1;
  color: white;
  padding: 0 10px;

  > *:not(:nth-child(1)) {
    color: ${Colors.Black[400]};
  }

  > *:last-child {
    color: white;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

const FMImage = styled.img`
  width: 100px;
  height: 60px;
  object-fit: contain;
`
