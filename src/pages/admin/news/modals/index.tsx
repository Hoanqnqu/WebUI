import { MODAL } from "@/utils/constants/GlobalConst";
import { useAppSelector } from "@/redux/hook";
import ModalAntd from "@/components/Modal";
import { INews } from "@/interfaces/news.interface";
// import ModalAdd from "./Add";
// import ModalUpdate from "./Update";
import ModalView from "./View";
import ModalAdd from "./Add";
import ModalUpdate from "./Update";
// import ModalDelete from "./Delete";

const ModalNews = () => {
  const type = useAppSelector((state) => state.modal.type);
  const data = useAppSelector((state) => state.modal.data) as INews;
  const getModalContent = () => {
    switch (type) {
      case MODAL.UPDATE.NEWS:
        return <ModalUpdate title="Update News" data={data} />;
      case MODAL.VIEW.NEWS:
        return <ModalView title="View News" data={data} />;
      case  MODAL.ADD.NEWS:
        return <ModalAdd title="Add News" />;
      default:
        return null;
    }
  };

  return <ModalAntd>{getModalContent()}</ModalAntd>;
};

export default ModalNews;
