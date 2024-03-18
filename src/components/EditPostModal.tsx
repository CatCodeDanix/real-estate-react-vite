import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import EditPostForm from "./EditPostForm";

interface EditPostModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const EditPostModal = ({ isOpen, onOpenChange }: EditPostModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="z-[1000]">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                ویرایش اطلاعات آگهی
              </ModalHeader>
              <ModalBody>
                <EditPostForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPostModal;
