import React, { useCallback, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { InputComponent, InputText } from '@/common/components/forms'
import { TextBig, TextMedium } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { socialMediaList, SocialMediaTile, Socials } from '@/memberships/components/SocialMediaTile/SocialMediaTile'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'

const socialToPlaceholder: Record<Socials, string> = {
  HYPERLINK: 'Enter URL',
  WECHAT: 'Enter Username',
  IRC: 'Enter Username',
  WHATSAPP: 'Enter Username',
  MATRIX: 'Enter Username',
  YOUTUBE: 'Enter channel name',
  FACEBOOK: 'Enter Username',
  DISCORD: 'Enter Member handle',
  TELEGRAM: 'Enter Username',
  TWITTER: 'Enter Username',
  EMAIL: 'Enter Email',
  LINKEDIN: 'Enter Username',
}

interface Props {
  initialSocials?: Socials[]
}

export const SocialMediaSelector = ({ initialSocials }: Props) => {
  const [chosenSocial, setChosenSocial] = useState<Socials[]>(initialSocials ?? [])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const form = useFormContext()

  const selectSocial = useCallback(
    (social: Socials) => () => {
      flushSync(() => {
        setChosenSocial((prev) => [...prev, social])
      })
      if (wrapperRef.current && chosenSocial.length === 0) {
        // this check is required for test to not fail, looks like flushSync is not supported by RTL
        'scrollIntoView' in (wrapperRef.current.lastElementChild ?? {}) &&
          wrapperRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [wrapperRef.current, chosenSocial.length]
  )

  const removeSocial = useCallback(
    (social: Socials) => () => {
      setChosenSocial((prev) => prev.filter((prevSocial) => prevSocial !== social))
      form?.setValue(`externalResources.${social}` as keyof MemberFormFields, null, { shouldValidate: true })
    },
    [form.resetField]
  )

  return (
    <SocialMediaInput ref={wrapperRef}>
      <TextBig bold>Social Profiles</TextBig>
      <TextMedium>This will help us to contact you</TextMedium>

      <div>
        {socialMediaList.map((social, index) => {
          const isActive = chosenSocial.some((chosen) => chosen === social)
          return (
            <SocialMediaTile
              active={isActive}
              social={social}
              id={`${social.toLowerCase()}-tile`}
              key={'social' + index}
              onClick={!isActive ? selectSocial(social) : removeSocial(social)}
            />
          )
        })}
      </div>
      {chosenSocial.map((social, index) => (
        <InputComponent
          key={'social' + index}
          id={social + 1}
          inputSize="m"
          name={`externalResources.${social}`}
          label={capitalizeFirstLetter(social.toLowerCase())}
        >
          <InputText
            id={`${social.toLowerCase()}-input`}
            name={`externalResources.${social}`}
            placeholder={socialToPlaceholder[social]}
          />
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
