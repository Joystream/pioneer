import { Modal, ModalBody, ModalHeader } from "@/common/components/Modal";
import { TextMedium } from "@/common/components/typography";
import React from "react";

interface Props {
  onClose: () => void
  text: string
}

export const PostActionSuccessModal = ({ onClose, text }: Props) => (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Success!" />
      <ModalBody>
        <TextMedium>{text}</TextMedium>
      </ModalBody>
    </Modal>
)
