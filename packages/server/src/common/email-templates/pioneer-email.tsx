import { Body } from '@react-email/body'
import { Button } from '@react-email/button'
import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Heading } from '@react-email/heading'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Preview } from '@react-email/preview'
import { render } from '@react-email/render'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import * as React from 'react'

import { PIONEER_URL } from '../config'

interface PioneerEmailTemplateProps {
  memberHandle: string
  text: string
  summary: string
  button: {
    href: string
    label: string
  }
}

const APP_LOGOS = 'https://eu-central-1.linodeobjects.com/atlas-assets/email/logos/pioneer'

const PioneerEmailTemplate = ({
  memberHandle = 'bob',
  text = 'New council election has just started. Follow the link below to announce your candidacy.',
  summary,
  // button default value only for email development preview
  button = {
    href: `${PIONEER_URL}/#/election`,
    label: 'See on Pioneer',
  },
}: PioneerEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>{summary}</Preview>
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Section style={logoSectionStyle}>
          <Img src={`${APP_LOGOS}/header.png`} alt="Pioneer's Logo" style={pioneerLogoStyle} />
        </Section>
        <Section style={mainSectionStyle}>
          <Heading style={h1Style}>Hi {memberHandle},</Heading>
          <Text style={textStyle}>{text}</Text>
          {button && (
            <Button href={button.href} style={ctaStyle} pX={16} pY={12}>
              {button.label}
            </Button>
          )}
        </Section>
        <Section style={footerSectionStyle}>
          <Img src={`${APP_LOGOS}/footer.png`} alt="Small Pioneer logo" style={footerLogoStyle} />
          <Text style={bigLinksStyle}>
            <Link href={PIONEER_URL} style={bigLinkStyle}>
              pioneerapp.xyz
            </Link>
            <span style={divisorStyle}>|</span>
            <Link href="https://joystream.org" style={bigLinkStyle}>
              joystream.org
            </Link>
          </Text>
          <Text style={pioneerLinksStyle}>
            <Link href={`${PIONEER_URL}/#/election`} style={pioneerLinkStyle}>
              Council
            </Link>
            <Link href={`${PIONEER_URL}/#/proposals/current`} style={middlePioneerLinkStyle}>
              Proposals
            </Link>
            <Link href={`${PIONEER_URL}/#/forum`} style={pioneerLinkStyle}>
              Forum
            </Link>
          </Text>
          {/* TODO: include link to notifications settings */}
        </Section>
      </Container>
    </Body>
  </Html>
)

// default export is needed so that dev emails preview work
export default PioneerEmailTemplate
export const renderPioneerEmail = (props: PioneerEmailTemplateProps) => render(PioneerEmailTemplate(props))

const bodyStyle = {
  backgroundColor: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
}

const containerStyle = {
  margin: '0 auto',
  maxWidth: '600px',
  border: '1px solid #d6dee7',
}

const logoSectionStyle: React.CSSProperties = {
  padding: '32px 0',
}

const pioneerLogoStyle = {
  margin: '0 auto',
  width: '194px',
}

const mainSectionStyle = {
  padding: '10px 40px 40px',
}

const h1Style = {
  color: '#000',
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '700',
  marginTop: '0px',
  marginBottom: '8px',
}

const textStyle = {
  color: '#000',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: '400',
  margin: '0',
}

const ctaStyle = {
  backgroundColor: '#4038FF',
  color: '#fff',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '500',
  marginTop: '24px',
  padding: '12px 16px',
  borderRadius: '2px',
}

const footerSectionStyle = {
  backgroundColor: '#d6dee7',
  padding: '24px 16px 20px 16px',
}

const footerLogoStyle = {
  margin: '0 auto',
  width: '24px',
  marginBottom: '10px',
}

const bigLinksStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '0',
  marginBottom: '2px',
  lineHeight: '20px',
}

const bigLinkStyle = {
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '700',
  color: '#000',
}

const divisorStyle = {
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '700',
  color: '#5D6B80',
  margin: '0 8px',
}

const pioneerLinksStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '0',
  lineHeight: '14px',
}

const pioneerLinkStyle = {
  fontSize: '10px',
  lineHeight: '14px',
  fontWeight: '400',
  color: '#2f353b',
}

const middlePioneerLinkStyle = {
  ...pioneerLinkStyle,
  margin: '0 16px',
}
