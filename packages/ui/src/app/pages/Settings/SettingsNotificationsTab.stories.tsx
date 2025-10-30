import { expect } from '@storybook/jest'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { FC } from 'react'

import {
  BackendSigninDocument,
  GetBackendMeDocument,
  GetBackendMemberExistsDocument,
  UpdateBackendMemberDocument,
} from '@/memberships/queries/__generated__/backend.generated'
import { member } from '@/mocks/data/members'
import { getButtonByText, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { SettingsNotificationsTab } from './SettingsNotificationsTab'

const SIGNIN_TOKEN = 'new-token'

type Args = {
  isRegistered: boolean
  isEmailConfirmed: boolean
  isAuthorized: boolean
  activeMemberExistBackendLoading: boolean
  activeMemberExistBackendError: boolean
  updateMemberError: boolean
  signinError: boolean
  onMemberUpdate: jest.Mock
  onSetMemberSettings: jest.Mock
  onSignin: jest.Mock
}
type Story = StoryObj<FC<Args>>

const alice = member('alice')
const email = 'test@example.com'

export default {
  title: 'Pages/Settings/Notifications',
  component: SettingsNotificationsTab,

  argTypes: {
    isRegistered: { control: { type: 'boolean' } },
    isEmailConfirmed: { control: { type: 'boolean' } },
    onMemberUpdate: { action: 'MemberUpdate' },
    onSetMemberSettings: { action: 'SetMemberSettings' },
    onSignin: { action: 'Signin' },
  },

  args: {
    isRegistered: true,
    isEmailConfirmed: true,
    isAuthorized: true,
    activeMemberExistBackendLoading: false,
    activeMemberExistBackendError: false,
    updateMemberError: false,
    signinError: false,
  },

  parameters: {
    isLoggedIn: true,
    balance: 100,

    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      return {
        accounts: parameters.isLoggedIn
          ? { active: { member: alice, balances: parameters.balance } }
          : { list: [{ member: alice }] },

        gql: {
          queries: [
            {
              query: GetBackendMemberExistsDocument,
              resolver: () => ({
                data:
                  !args.activeMemberExistBackendLoading && !args.activeMemberExistBackendError
                    ? { memberExist: args.isRegistered }
                    : undefined,
                loading: args.activeMemberExistBackendLoading,
                error: args.activeMemberExistBackendError,
              }),
            },
            {
              query: GetBackendMeDocument,
              data: {
                me: {
                  email: args.isEmailConfirmed ? email : null,
                  unverifiedEmail: args.isEmailConfirmed ? null : email,
                  receiveEmails: true,
                  name: 'test',
                },
              },
              error: args.isAuthorized ? undefined : new Error('Unauthorized'),
            },
          ],
          mutations: [
            {
              mutation: UpdateBackendMemberDocument,
              onSend: (...sendArgs: any[]) => args.onMemberUpdate(...sendArgs),
              error: args.updateMemberError ? new Error('error') : undefined,
            },
            {
              mutation: BackendSigninDocument,
              onSend: (...sendArgs: any[]) => args.onSignin(...sendArgs),
              data: !args.signinError ? { signin: SIGNIN_TOKEN } : undefined,
              error: args.signinError ? new Error('error') : undefined,
            },
          ],
        },

        backend: {
          onSetMemberSettings: (...settingsArgs: any[]) => args.onSetMemberSettings(...settingsArgs),
          authToken: SIGNIN_TOKEN,
        },
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}

// ----------------------------------------------------------------------------
// Notifications settings: not registered
// ----------------------------------------------------------------------------

export const NotRegistered: Story = {
  args: {
    isRegistered: false,
  },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    const subscribeButton = getButtonByText(screen, 'Subscribe')
    expect(subscribeButton).toBeEnabled()
    await userEvent.click(subscribeButton)
    expect(modal.getByText('Sign up to email notifications')).toBeInTheDocument()
  },
}

// ----------------------------------------------------------------------------
// Notifications settings: registered, not confirmed
// ----------------------------------------------------------------------------
export const RegisteredNotConfirmed: Story = {
  args: {
    isEmailConfirmed: false,
  },

  play: async ({ args, canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText(/I want to be notified by email/)).toBeInTheDocument()
    expect(screen.getByText(/Verify your email account/)).toBeInTheDocument()

    const saveChangesButton = getButtonByText(screen, /Save changes/i)
    expect(saveChangesButton).toBeDisabled()

    const newLinkButton = getButtonByText(screen, /Generate new link/i)
    expect(newLinkButton).toBeEnabled()

    await userEvent.click(newLinkButton)
    expect(args.onMemberUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          email,
        },
      })
    )
    expect(newLinkButton).toHaveTextContent(/Link generated/i)
  },
}

// ----------------------------------------------------------------------------
// Notifications settings: registered, confirmed
// ----------------------------------------------------------------------------
export const RegisteredConfirmed: Story = {
  play: async ({ args, canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText(/I want to be notified by email/)).toBeInTheDocument()
    expect(screen.getByText(/Customizing notifications is not available yet/)).toBeInTheDocument()

    const saveChangesButton = getButtonByText(screen, /Save changes/i)
    expect(saveChangesButton).toBeDisabled()

    const _emailInput = screen.getByText(/Email/).parentElement?.querySelector('input')
    expect(_emailInput).toBeDefined()
    const emailInput = _emailInput as HTMLInputElement

    await waitFor(() => expect(emailInput).toHaveValue(email))

    userEvent.clear(emailInput)
    userEvent.type(emailInput, 'invalid')

    expect(saveChangesButton).toBeEnabled()
    userEvent.click(saveChangesButton)
    await waitFor(() => expect(screen.getByText(/must be a valid email/)).toBeInTheDocument())
    expect(args.onMemberUpdate).not.toHaveBeenCalled()

    const newEmail = 'new@email.com'
    userEvent.clear(emailInput)
    userEvent.type(emailInput, newEmail)

    expect(saveChangesButton).toBeEnabled()
    userEvent.click(saveChangesButton)
    await waitFor(() => expect(screen.getByText(/Settings saved/)).toBeInTheDocument())
    expect(args.onMemberUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          email: newEmail,
        },
      })
    )
  },
}

// ----------------------------------------------------------------------------
// Notifications settings: backend error
// ----------------------------------------------------------------------------
export const BackendError: Story = {
  args: {
    activeMemberExistBackendError: true,
  },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText(/Failed to load notifications settings/i)).toBeInTheDocument()
    expect(screen.queryByText(/I want to be notified by email/)).toBeNull()
  },
}

// ----------------------------------------------------------------------------
// Notifications settings: backend loading
// ----------------------------------------------------------------------------
export const BackendLoading: Story = {
  args: {
    activeMemberExistBackendLoading: true,
  },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)

    await waitFor(() => expect(screen.getByText(/Loading notification settings/i)).toBeInTheDocument())
    expect(screen.queryByText(/I want to be notified by email/)).toBeNull()
  },
}

// ----------------------------------------------------------------------------
// Notifications settings: update error
// ----------------------------------------------------------------------------
export const UpdateError: Story = {
  args: {
    updateMemberError: true,
  },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText(/I want to be notified by email/)).toBeInTheDocument()

    const saveChangesButton = getButtonByText(screen, /Save changes/i)
    const _emailInput = screen.getByText(/Email/).parentElement?.querySelector('input')
    expect(_emailInput).toBeDefined()
    const emailInput = _emailInput as HTMLInputElement
    await waitFor(() => expect(emailInput).toHaveValue(email))
    userEvent.type(emailInput, 'm')
    expect(saveChangesButton).toBeEnabled()
    userEvent.click(saveChangesButton)
    await waitFor(() => expect(screen.getByText(/Unexpected error/i)).toBeInTheDocument())
  },
}

// ----------------------------------------------------------------------------
// Notifications settings: Unauthorized, happy path
// ----------------------------------------------------------------------------
export const UnauthorizedHappy: Story = {
  args: {
    isAuthorized: false,
  },

  play: async ({ args, canvasElement }) => {
    const screen = within(canvasElement)

    const authorizeButton = await waitFor(() => getButtonByText(screen, /Authorize again/i))
    expect(authorizeButton).toBeEnabled()

    expect(args.onSignin).toHaveBeenCalledTimes(0)
    expect(args.onSetMemberSettings).toHaveBeenCalledTimes(0)
    userEvent.click(authorizeButton)
    await waitFor(() => expect(args.onSignin).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(args.onSetMemberSettings).toHaveBeenCalledTimes(1))
    const signinVariables = args.onSignin.mock.calls[0][0]?.variables
    expect(signinVariables).toBeDefined()
    expect(signinVariables.memberId).toBe(parseInt(alice.id))
    expect(signinVariables.signature).toBeDefined()
    expect(signinVariables.timestamp).toBeDefined()
    expect(args.onSetMemberSettings).toHaveBeenCalledWith(alice.id, { accessToken: SIGNIN_TOKEN })
  },
}

// ----------------------------------------------------------------------------
// Notifications settings: Unauthorized, error
// ----------------------------------------------------------------------------
export const UnauthorizedError: Story = {
  args: {
    isAuthorized: false,
    signinError: true,
  },

  play: async ({ args, canvasElement }) => {
    const screen = within(canvasElement)

    const authorizeButton = await waitFor(() => getButtonByText(screen, /Authorize again/i))
    expect(authorizeButton).toBeEnabled()

    expect(args.onSignin).toHaveBeenCalledTimes(0)
    expect(args.onSetMemberSettings).toHaveBeenCalledTimes(0)
    userEvent.click(authorizeButton)
    await waitFor(() => expect(args.onSignin).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(args.onSetMemberSettings).toHaveBeenCalledTimes(0))
    await waitFor(() => expect(screen.getByText(/Unexpected error/i)).toBeInTheDocument())
  },
}
