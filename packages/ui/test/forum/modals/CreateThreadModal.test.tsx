import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { CKEditorProps } from '@/common/components/CKEditor'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { CreateThreadModal } from '@/forum/modals/CreateThreadModal'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider } from '../../_mocks/providers'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('CreateThreadModal', () => {
  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: undefined,
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeEach(async () => {
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))
  })

  it('Failed requirements: no active member', () => {
    useMyMemberships.active = undefined
    renderModal()
    expect(useModal.showModal).toBeCalledWith({ modal: 'SwitchMember' })
  })

  describe('General details', () => {
    it('No details entered', async () => {
      renderModal()
      expect(await getButton(/next step/i)).toBeDisabled()
    })

    it('Both fields filled', async () => {
      renderModal()
      await fillDetails()
      expect(await getButton(/next step/i)).not.toBeDisabled()
    })
  })

  async function fillDetails() {
    const topicInput = await screen.findByLabelText(/topic of the thread/i)
    await fireEvent.change(topicInput, { target: { value: 'topic' } })

    const descriptionInput = await screen.findByLabelText(/description/i)
    await fireEvent.change(descriptionInput, { target: { value: 'lorem' } })
  }

  function renderModal() {
    return render(
      <MemoryRouter>
        <ModalContext.Provider value={useModal}>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <CreateThreadModal />
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </ModalContext.Provider>
      </MemoryRouter>
    )
  }
})
