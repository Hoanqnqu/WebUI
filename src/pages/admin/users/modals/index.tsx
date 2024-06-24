import { MODAL } from "@/utils/constants/GlobalConst";
import { useAppSelector } from "@/redux/hook";
import ModalAntd from "@/components/Modal";
import { IUser } from "@/interfaces/user.interface";
import ModalDelete from "./DeleteModal";

const ModalUser = () => {
  const type = useAppSelector((state) => state.modal.type);
  const data = useAppSelector((state) => state.modal.data) as IUser;
  const getModalContent = () => {
    switch (type) {
      case MODAL.DELETE.USER:
        return <ModalDelete title="Delete User" data={data} />;
      default:
        return null;
    }
  };

  return <ModalAntd>{getModalContent()}</ModalAntd>;
};

export default ModalUser;