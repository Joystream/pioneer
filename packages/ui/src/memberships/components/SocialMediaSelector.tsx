import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { TextBig, TextMedium } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { socialMediaList, SocialMediaTile, Socials } from '@/memberships/components/SocialMediaTile'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'

const socialToPlaceholder: Record<Socials, string> = {
  link: 'Enter URL',
  wechat: 'Enter Username',
  irc: 'Enter Username',
  whatsapp: 'Enter Username',
  matrix: 'Enter Username',
  youtube: 'Enter channel name',
  facebook: 'Enter Username',
  discord: 'Enter Member handle',
  telegram: 'Enter Username',
  twitter: 'Enter Username',
  email: 'Enter Email',
}

interface Props {
  initialSocials?: Socials[]
}

export const SocialMediaSelector = ({ initialSocials }: Props) => {
  const [chosenSocial, setChosenSocial] = useState<Socials[]>(initialSocials ?? [])
  const form = useFormContext()

  return (
    <SocialMediaInput>
      <TextBig bold>Social Profiles</TextBig>
      <TextMedium>This will help us to contact you</TextMedium>

      <div>
        {socialMediaList.map((social, index) => (
          <SocialMediaTile
            active={chosenSocial.some((chosen) => chosen === social)}
            social={social}
            key={'social' + index}
            onClick={() => setChosenSocial((prev) => [...prev, social])}
          />
        ))}
      </div>
      {chosenSocial.map((social) => (
        <SocialMediaInputBox key={social + 1 + 'input'}>
          <InputComponent id={social + 1} inputSize="m" label={capitalizeFirstLetter(social)}>
            <InputText name={social} placeholder={socialToPlaceholder[social]} />
          </InputComponent>
          <CloseButton
            onClick={() => {
              setChosenSocial((prev) => prev.filter((prevSocial) => prevSocial !== social))
              form?.resetField(social as keyof MemberFormFields)
            }}
          />
        </SocialMediaInputBox>
      ))}
    </SocialMediaInput>
  )
}

const SocialMediaInput = styled.div`
  display: grid;
  gap: 10px;

  > :nth-child(3) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`

const SocialMediaInputBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;

  button {
    margin-bottom: 15px;
  }
`
