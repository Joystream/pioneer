import { expect } from '@storybook/jest'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { FC } from 'react'

import {
  GetBackendMeDocument,
  GetBackendMemberExistsDocument,
  UpdateBackendMemberDocument,
} from '@/memberships/queries/__generated__/backend.generated'
import { member } from '@/mocks/data/members'
import { getButtonByText, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { SettingsNotificationsTab } from './SettingsNotificationsTab'

type Args = {
  isRegistered: boolean
  isEmailConfirmed: boolean
  activeMemberExistBackendLoading: boolean
  activeMemberExistBackendError: boolean
  updateMemberError: boolean
  onMemberUpdate: CallableFunction
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
  },

  args: {
    isRegistered: true,
    isEmailConfirmed: true,
    activeMemberExistBackendLoading: false,
    activeMemberExistBackendError: false,
    updateMemberError: false,
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
            },
          ],
          mutations: [
            {
              mutation: UpdateBackendMemberDocument,
              onSend: (...sendArgs: any[]) => args.onMemberUpdate(...sendArgs),
              error: args.updateMemberError ? new Error('error') : undefined,
            },
          ],
        },

        backend: {
          notificationsSettingsMap: {
            [alice.id]: {
              accessToken: 'token',
            },
          },
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
