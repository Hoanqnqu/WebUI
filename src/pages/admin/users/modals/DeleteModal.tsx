import Title from "@/components/Modal/Title";
import useServerMessage from "@/hooks/useServerMessage";
import { IModal } from "@/interfaces/modal.interface";
import { useDeleteUserMutation } from "@/redux/services/users/user.service";
import { Button, Spin } from "antd";

const ModalDelete = (props: IModal) => {
  const { title, data: user } = props;
  const { id } = user;

  const [deleteUser, { data, error, isLoading }] = useDeleteUserMutation();

  const onDelete = async () => {
    await deleteUser(id);
  };

  useServerMessage({ data: data!, error: error });

  return (
    <Spin spinning={isLoading} className="flex flex-col items-center">
      <Title>{title}</Title>

      <p className=" mb-6 text-center font-medium">
        Are you sure you want to delete this user?
      </p>
      <div className="flex w-full justify-end">
        <Button
          onClick={onDelete}
          loading={isLoading}
          className={`border-none bg-red-500  text-white`}
        >
          Delete
        </Button>
      </div>
    </Spin>
  );
};

export default ModalDelete;