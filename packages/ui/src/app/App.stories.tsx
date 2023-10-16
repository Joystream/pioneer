import { metadataToBytes } from '@joystream/js/utils'
import { MembershipMetadata } from '@joystream/metadata-protobuf'
import { expect } from '@storybook/jest'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import React, { FC } from 'react'
import { createGlobalStyle } from 'styled-components'

import { Page, Screen } from '@/common/components/page/Page'
import { Colors } from '@/common/constants'
import { EMAIL_VERIFICATION_TOKEN_SEARCH_PARAM } from '@/memberships/constants'
import { GetMemberDocument } from '@/memberships/queries'
import {
  ConfirmBackendEmailDocument,
  GetBackendMemberExistsDocument,
  RegisterBackendMemberDocument,
} from '@/memberships/queries/__generated__/backend.generated'
import { Membership, member } from '@/mocks/data/members'
import { Container, getButtonByText, joy, selectFromDropdown, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { App } from './App'
import { OnBoardingOverlay } from './components/OnboardingOverlay/OnBoardingOverlay'
import { SideBar } from './components/SideBar'

const MOCK_VERIFICATION_TOKEN = '1234567890'

type Args = {
  isLoggedIn: boolean
  hasMemberships: boolean
  hasFunds: boolean
  hasAccounts: boolean
  hasWallet: boolean
  isRPCNodeConnected: boolean
  hasRegisteredEmail: boolean
  hasBeenAskedForEmail: boolean
  onBuyMembership: jest.Mock
  onTransfer: jest.Mock
  onSubscribeEmail: jest.Mock
  onConfirmEmail: jest.Mock
}

type Story = StoryObj<FC<Args>>

const alice = member('alice')
const bob = member('bob')
const charlie = member('charlie')

const NEW_MEMBER_DATA = {
  id: alice.id, // we set this to alice's ID so that after member is created, member with same ID can be found in MembershipContext
  handle: 'realbobbybob',
  metadata: {
    name: 'BobbyBob',
    about: 'Lorem ipsum...',
    avatar: { avatarUri: 'https://api.dicebear.com/6.x/bottts-neutral/svg?seed=bob' },
  },
}

const NoPaddingStyle = createGlobalStyle`
  html, body {
    padding: 0 !important;
  }
`

export default {
  title: 'App',
  component: App,

  argTypes: {
    onBuyMembership: { action: 'BuyMembership' },
    onTransfer: { action: 'BalanceTransfer' },
    onSubscribeEmail: { action: 'SubscribeEmail' },
    onConfirmEmail: { action: 'ConfirmEmail' },
  },

  args: {
    isLoggedIn: true,
    hasMemberships: true,
    hasAccounts: true,
    hasFunds: true,
    hasWallet: true,
    isRPCNodeConnected: true,
    hasRegisteredEmail: true,
    hasBeenAskedForEmail: true,
  },

  parameters: {
    totalBalance: 100,

    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const account = (member: Membership) => ({
        balances: args.hasFunds ? parameters.totalBalance : 0,
        ...(args.hasMemberships ? { member } : { account: { name: member.handle, address: member.controllerAccount } }),
      })
      return {
        accounts: {
          active: args.isLoggedIn ? 'alice' : undefined,
          list: args.hasMemberships || args.hasAccounts ? [account(alice), account(bob), account(charlie)] : [],
          hasWallet: args.hasWallet,
        },

        chain: !args.isRPCNodeConnected
          ? undefined
          : {
              query: {
                members: { membershipPrice: joy(20) },
                council: { stage: { stage: { isIdle: true }, changedAt: 123 } },
                referendum: { stage: {} },
              },

              tx: {
                balances: {
                  transfer: {
                    event: 'Transfer',
                    onSend: args.onTransfer,
                  },
                },
                members: {
                  buyMembership: {
                    event: 'MembershipBought',
                    data: [NEW_MEMBER_DATA.id],
                    onSend: args.onBuyMembership,
                    failure: parameters.txFailure,
                  },
                },
              },
            },

        gql: {
          queries: [
            {
              query: GetMemberDocument,
              data: { membershipByUniqueInput: { ...bob, ...NEW_MEMBER_DATA, invitees: [] } },
            },
            {
              query: GetBackendMemberExistsDocument,
              data: { memberExist: args.hasRegisteredEmail },
            },
          ],
          mutations: [
            {
              mutation: RegisterBackendMemberDocument,
              onSend: (...sendArgs: any[]) => args.onSubscribeEmail(...sendArgs),
              data: { signup: '' },
            },
            {
              mutation: ConfirmBackendEmailDocument,
              onSend: (...sendArgs: any[]) => args.onConfirmEmail(...sendArgs),
              data: { confirmEmail: '' },
            },
          ],
        },

        backend: {
          notificationsSettingsMap: {
            [bob.id]: {
              hasBeenAskedForEmail: args.hasBeenAskedForEmail,
            },
          },
        },
      }
    },
  },

  render: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args // This parameter is needs for the controls to appear in stories
  ) => (
    <Page>
      <NoPaddingStyle />
      <SideBar />
      <Screen>
        <OnBoardingOverlay />
      </Screen>
    </Page>
  ),
} satisfies Meta<Args>

export const Default: Story = {}

export const UnreachableRPCNode: Story = { args: { isRPCNodeConnected: false } }

// ----------------------------------------------------------------------------
// Test Switch membership modal
// ----------------------------------------------------------------------------

export const SwitchMembership: Story = {
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    expect(screen.queryByText('Become a member')).toBeNull()

    await step('Switch active membership to bob', async () => {
      expect(screen.queryByText('bob')).toBeNull()
      await userEvent.click(screen.getByText('alice'))

      await userEvent.click(modal.getByText('bob'))
      expect(screen.queryByText('alice')).toBeNull()
      expect(screen.getByText('bob'))
    })

    await step('Sign out', async () => {
      await userEvent.click(screen.getByText('bob'))
      await userEvent.click(modal.getByText('Sign Out'))
      expect(modal.getByText('Sign out of bob ?'))
      await userEvent.click(getButtonByText(modal, 'Sign Out'))

      expect(getButtonByText(screen, 'Select membership'))
    })
  },
}

// ----------------------------------------------------------------------------
// Test On Boarding Overlay
// ----------------------------------------------------------------------------

export const OnBoardingOverlayStory: Story = {
  args: { hasWallet: false, hasAccounts: false, hasFunds: false, hasMemberships: false, isLoggedIn: false },

  name: 'On Boarding Overlay',

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText('Become a member'))
    userEvent.click(screen.getByText('Show how'))
    expect(screen.getByText('What are the benefits?'))
    expect(screen.getByText('How to become a member?'))

    expect(screen.getByText('Connect wallet', { selector: 'h6' }))
    expect(screen.getByText('Connect account', { selector: 'h6' }))
    expect(screen.getByText('Create free membership', { selector: 'h6' }))
  },
}

// ----------------------------------------------------------------------------
// Test On Boarding flow
// ----------------------------------------------------------------------------

const expectActiveStepToBe = (modal: Container, text: string) =>
  expect(modal.getByText(text, { selector: 'h6' }).parentElement?.previousElementSibling).toHaveStyle(
    `background-color: ${Colors.Blue[500]}`
  )

export const ConnectWallet: Story = {
  args: { hasWallet: false, hasAccounts: false, hasFunds: false, hasMemberships: false, isLoggedIn: false },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText('Become a member'))

    await userEvent.click(getButtonByText(screen, 'Connect Wallet', { selector: 'nav *' }))

    const modal = withinModal(canvasElement)
    expectActiveStepToBe(modal, 'Connect wallet')
    expect(modal.getByText('Select Wallet'))
    const pluginButton = getButtonByText(modal, 'Install extension')
    expect(pluginButton).toBeDisabled()
    await userEvent.click(modal.getByText('Polkadot.js'))
    expect(pluginButton).toBeEnabled()
  },
}

export const NoAccount: Story = {
  args: { hasAccounts: false, hasFunds: false, hasMemberships: false, isLoggedIn: false },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText('Become a member'))

    await userEvent.click(getButtonByText(screen, 'Join Now', { selector: 'nav *' }))

    const modal = withinModal(canvasElement)
    expectActiveStepToBe(modal, 'Connect account')
    expect(modal.getByText('Connect account', { selector: '[class^=ModalBody] *' }))
    expect(getButtonByText(modal, 'Return to wallet selection')).toBeEnabled()
    expect(getButtonByText(modal, 'Connect Account')).toBeDisabled()
    expect(modal.queryByText('alice')).toBeNull()
  },
}

export const FaucetMembership: Story = {
  args: { hasFunds: false, hasMemberships: false, isLoggedIn: false },

  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    expect(screen.getByText('Become a member'))

    await userEvent.click(getButtonByText(screen, 'Join Now', { selector: 'nav *' }))

    await step('Connect account', async () => {
      expectActiveStepToBe(modal, 'Connect account')
      expect(modal.getByText('Connect account', { selector: '[class^=ModalBody] *' }))

      expect(getButtonByText(modal, 'Return to wallet selection')).toBeEnabled()

      const connectAccountButton = getButtonByText(modal, 'Connect Account')
      expect(connectAccountButton).toBeDisabled()
      await userEvent.click(modal.getByText('alice'))
      expect(connectAccountButton).toBeEnabled()

      expect(localStorage.getItem('onboarding-membership-account')).toBeNull()
      await userEvent.click(connectAccountButton)
      expect(localStorage.getItem('onboarding-membership-account')).toBe(JSON.stringify(alice.controllerAccount))
    })

    await step('Create free membership', async () => {
      await waitFor(() => expectActiveStepToBe(modal, 'Create free membership'))
      expect(modal.getByText('Please fill in all the details below.'))

      // Check that the CAPTCHA blocks the next step
      await userEvent.type(modal.getByLabelText('Member Name'), NEW_MEMBER_DATA.metadata.name)
      await userEvent.type(modal.getByLabelText('Membership handle'), NEW_MEMBER_DATA.handle)
      await userEvent.type(modal.getByLabelText('About member'), NEW_MEMBER_DATA.metadata.about)
      await userEvent.type(modal.getByLabelText('Member Avatar'), NEW_MEMBER_DATA.metadata.avatar.avatarUri)
      await userEvent.click(modal.getByLabelText(/^I agree to the/))
      expect(getButtonByText(modal, 'Create a Membership')).toBeDisabled()
    })
  },
}

// ----------------------------------------------------------------------------
// Test Buy Membership Modal
// ----------------------------------------------------------------------------
const fillMembershipForm = async (modal: Container) => {
  await selectFromDropdown(modal, 'Root account', 'alice')
  await selectFromDropdown(modal, 'Controller account', 'bob')
  await userEvent.type(modal.getByLabelText('Member Name'), NEW_MEMBER_DATA.metadata.name)
  await userEvent.type(modal.getByLabelText('Membership handle'), NEW_MEMBER_DATA.handle)
  await userEvent.type(modal.getByLabelText('About member'), NEW_MEMBER_DATA.metadata.about)
  await userEvent.type(modal.getByLabelText('Member Avatar'), NEW_MEMBER_DATA.metadata.avatar.avatarUri)
  await userEvent.click(modal.getByLabelText(/^I agree to the/))
}

export const BuyMembershipHappy: Story = {
  args: { hasMemberships: false, isLoggedIn: false },

  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    expect(screen.queryByText('Become a member')).toBeNull()

    await userEvent.click(getButtonByText(screen, 'Join Now'))

    await step('Form', async () => {
      const createButton = getButtonByText(modal, 'Create a Membership')

      await step('Fill', async () => {
        expect(createButton).toBeDisabled()
        await fillMembershipForm(modal)
        await waitFor(() => expect(createButton).toBeEnabled())
      })

      await step('Disables button on incorrect email address', async () => {
        await userEvent.click(modal.getByText('Email'))
        const emailInput = modal.getByPlaceholderText('Enter Email')

        await userEvent.type(emailInput, 'bobby@bob')
        await waitFor(() => expect(createButton).toBeDisabled())
        await userEvent.type(emailInput, '.com')
        await waitFor(() => expect(createButton).toBeEnabled())
      })

      await userEvent.click(createButton)
    })

    await step('Sign', async () => {
      expect(modal.getByText('Authorize transaction'))
      expect(modal.getByText('You intend to create a new membership.'))
      expect(modal.getByText('Creation fee:')?.nextSibling?.textContent).toBe('20')
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'bob' }))

      await userEvent.click(getButtonByText(modal, 'Sign and create a member'))
    })

    await step('Confirm', async () => {
      expect(await modal.findByText('Success'))
      expect(modal.getByText(NEW_MEMBER_DATA.handle))

      expect(args.onBuyMembership).toHaveBeenCalledWith({
        rootAccount: alice.controllerAccount,
        controllerAccount: bob.controllerAccount,
        handle: NEW_MEMBER_DATA.handle,
        metadata: metadataToBytes(MembershipMetadata, {
          name: NEW_MEMBER_DATA.metadata.name,
          about: NEW_MEMBER_DATA.metadata.about,
          avatarUri: NEW_MEMBER_DATA.metadata.avatar.avatarUri,
          externalResources: [{ type: MembershipMetadata.ExternalResource.ResourceType.EMAIL, value: 'bobby@bob.com' }],
        }),
        invitingMemberId: undefined,
        referrerId: undefined,
      })

      const doneButton = getButtonByText(modal, 'Done')
      expect(doneButton).toBeEnabled()
      userEvent.click(doneButton)
    })
  },
}

// in this test, we are testing whether the email subscription modal is shown after the membership is bought
// there's no easy way to change mocked members mid-story so we start with memberships
// this way the BuyMembershipModal can set active member, which should trigger the email subscription modal
export const BuyMembershipEmailSignup: Story = {
  args: { hasMemberships: true, isLoggedIn: false, hasRegisteredEmail: false, hasBeenAskedForEmail: false },

  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    userEvent.click(getButtonByText(screen, 'Select membership'))
    const newMemberButton = screen.getByText('New Member') as HTMLElement
    expect(newMemberButton).toBeEnabled()
    userEvent.click(newMemberButton)
    const createButton = getButtonByText(modal, 'Create a Membership')
    await fillMembershipForm(modal)
    await waitFor(() => expect(createButton).toBeEnabled())
    userEvent.click(createButton)
    userEvent.click(await waitFor(() => getButtonByText(modal, 'Sign and create a member')))

    await step('Confirm', async () => {
      expect(await modal.findByText('Success'))
      expect(modal.getByText(NEW_MEMBER_DATA.handle))

      expect(args.onBuyMembership).toHaveBeenCalledWith({
        rootAccount: alice.controllerAccount,
        controllerAccount: bob.controllerAccount,
        handle: NEW_MEMBER_DATA.handle,
        metadata: metadataToBytes(MembershipMetadata, {
          name: NEW_MEMBER_DATA.metadata.name,
          about: NEW_MEMBER_DATA.metadata.about,
          avatarUri: NEW_MEMBER_DATA.metadata.avatar.avatarUri,
        }),
        invitingMemberId: undefined,
        referrerId: undefined,
      })

      const doneButton = getButtonByText(modal, 'Done')
      expect(doneButton).toBeEnabled()
      userEvent.click(doneButton)

      await waitFor(() => modal.findByText('Sign up to email notifications'))
    })
  },
}

export const BuyMembershipNotEnoughFund: Story = {
  args: { hasMemberships: false, isLoggedIn: false },
  parameters: { totalBalance: 20 },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await userEvent.click(getButtonByText(screen, 'Join Now'))

    await fillMembershipForm(modal)
    const createButton = getButtonByText(modal, 'Create a Membership')
    await waitFor(() => expect(createButton).toBeEnabled())
    await userEvent.click(createButton)

    expect(modal.getByText('Insufficient funds to cover the membership creation.'))
    expect(getButtonByText(modal, 'Sign and create a member')).toBeDisabled()
  },
}

export const BuyMembershipTxFailure: Story = {
  args: { hasMemberships: false, isLoggedIn: false },
  parameters: { txFailure: 'Some error message' },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await userEvent.click(getButtonByText(screen, 'Join Now'))

    await fillMembershipForm(modal)
    const createButton = getButtonByText(modal, 'Create a Membership')
    await waitFor(() => expect(createButton).toBeEnabled())
    await userEvent.click(createButton)

    await userEvent.click(getButtonByText(modal, 'Sign and create a member'))

    expect(await screen.findByText('Failure'))
    expect(await modal.findByText('Some error message'))
  },
}

// ----------------------------------------------------------------------------
// Test Email Subsciption Modal
// ----------------------------------------------------------------------------
export const EmailSubscriptionModalDecline: Story = {
  args: {
    isLoggedIn: true,
    hasMemberships: true,
    hasAccounts: true,
    hasFunds: true,
    hasWallet: true,
    isRPCNodeConnected: true,
    hasRegisteredEmail: false,
    hasBeenAskedForEmail: false,
  },
  play: async ({ canvasElement }) => {
    const modal = withinModal(canvasElement)
    const element = await modal.getByText('Sign up to email notifications')
    expect(element)
    await userEvent.click(modal.getByText('Not now'))
    expect(element).not.toBeInTheDocument()
  },
}

export const EmailSubscriptionModalWrongEmail: Story = {
  args: {
    isLoggedIn: true,
    hasMemberships: true,
    hasAccounts: true,
    hasFunds: true,
    hasWallet: true,
    isRPCNodeConnected: true,
    hasRegisteredEmail: false,
    hasBeenAskedForEmail: false,
  },
  play: async ({ canvasElement }) => {
    const modal = withinModal(canvasElement)
    const button = modal.getByText(/^Sign and Authorize Email/i).closest('button')
    expect(button).toBeDisabled()
    await userEvent.type(modal.getByPlaceholderText('Add email for notifications here'), 'test@email')
    expect(button).toBeDisabled()
  },
}

export const EmailSubscriptionModalSubscribe: Story = {
  args: {
    isLoggedIn: true,
    hasMemberships: true,
    hasAccounts: true,
    hasFunds: true,
    hasWallet: true,
    isRPCNodeConnected: true,
    hasRegisteredEmail: false,
    hasBeenAskedForEmail: false,
  },
  play: async ({ canvasElement, args: { onSubscribeEmail } }) => {
    const modal = withinModal(canvasElement)
    const button = modal.getByText(/^Sign and Authorize Email/i)
    expect(button.closest('button')).toBeDisabled()
    const testEmail = 'test@email.com'
    await userEvent.type(modal.getByPlaceholderText('Add email for notifications here'), testEmail)
    await waitFor(() => expect(button.closest('button')).toBeEnabled())
    expect(onSubscribeEmail).toHaveBeenCalledTimes(0)
    await userEvent.click(button)

    await waitFor(
      () => {
        expect(onSubscribeEmail).toHaveBeenCalledTimes(1)
        const mutationVariables = onSubscribeEmail.mock.calls[0][0]?.variables
        expect(mutationVariables).toBeDefined()
        expect(mutationVariables.id).toBe(parseInt(alice.id))
        expect(mutationVariables.name).toBe(alice.metadata.name || alice.handle)
        expect(mutationVariables.email).toBe(testEmail)
        expect(mutationVariables.signature).toBeDefined()
        expect(mutationVariables.timestamp).toBeDefined()
      },
      { timeout: 100 }
    )
    await waitFor(() => expect(modal.getByText('Success!')), { timeout: 100 })
  },
}

// ----------------------------------------------------------------------------
// Test Email Confirmation Modal
// ----------------------------------------------------------------------------
export const EmailConfirmationModal: Story = {
  parameters: { router: { href: `/?${EMAIL_VERIFICATION_TOKEN_SEARCH_PARAM}=${MOCK_VERIFICATION_TOKEN}` } },
  play: async ({ canvasElement, args: { onConfirmEmail } }) => {
    const modal = withinModal(canvasElement)
    expect(onConfirmEmail).toHaveBeenCalledWith({
      variables: {
        token: MOCK_VERIFICATION_TOKEN,
      },
    })
    expect(modal.getByText(/Your email has been confirmed/))
  },
}
