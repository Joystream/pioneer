import React, { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { InputComponent, InputText } from '@/common/components/forms'
import { TextBig, TextMedium } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { socialMediaList, SocialMediaTile, Socials } from '@/memberships/components/SocialMediaTile/SocialMediaTile'
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

  const selectSocial = useCallback(
    (social: Socials) => () => {
      setChosenSocial((prev) => [...prev, social])
    },
    []
  )

  const removeSocial = useCallback(
    (social: Socials) => () => {
      setChosenSocial((prev) => prev.filter((prevSocial) => prevSocial !== social))
      form?.resetField(social as keyof MemberFormFields)
    },
    [form.resetField]
  )

  return (
    <SocialMediaInput>
      <TextBig bold>Social Profiles</TextBig>
      <TextMedium>This will help us to contact you</TextMedium>

      <div>
        {socialMediaList.map((social, index) => {
          const isActive = chosenSocial.some((chosen) => chosen === social)
          return (
            <SocialMediaTile
              active={isActive}
              social={social}
              key={'social' + index}
              onClick={!isActive ? selectSocial(social) : removeSocial(social)}
            />
          )
        })}
      </div>
      {chosenSocial.map((social, index) => (
        <InputComponent id={social + 1} inputSize="m" label={capitalizeFirstLetter(social)}>
          <InputText id={'social-input-' + index} name={social} placeholder={socialToPlaceholder[social]} />
        </InputComponent>
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
