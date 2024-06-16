import { Button, DatePicker, Form, Input, Select, Spin, Upload } from "antd";
import { IModal } from "@/interfaces/modal.interface";
import Title from "@/components/Modal/Title";
import { uploadImageFormData, normFile } from "@/utils/helpers";
import TextEditor from "../TextEditor";
import { AiOutlineUpload } from "react-icons/ai";
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service";
import { useCreateNewsMutation } from "@/redux/services/news/news.service";
import { useUploadImagesMutation } from "@/redux/services/help/help.service";
import useServerMessage from "@/hooks/useServerMessage";
const { TextArea } = Input;
const ModalAdd = (props: IModal) => {
  const { title } = props;
  const categories = useGetCategoriesQuery("");
  const [createNews, { data, error, isLoading }] =useCreateNewsMutation();
  const  [uploadImage, { data: dataUpload, error: errorUpload, isLoading: isLoadingUpload }] = useUploadImagesMutation();
  useServerMessage({ data: data!, error: error });
  useServerMessage({ data: dataUpload!, error: errorUpload });
  const onFinish = async (values: any) => {
    console.log(values)
    const formData = uploadImageFormData(values);
    const res = await uploadImage(formData).unwrap();
    if (res.status == "201" && res.data) {
      values.image_url = res.data
    }
    else {
      console.log("upload error")
  }
    await createNews({
      ...values,
    });
  };

  return (
    <Spin spinning={isLoading||isLoadingUpload}>
      <Title>{title}</Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 100 }}
        onFinish={onFinish}
        layout="vertical"
        // className="flex w-full flex-col items-center gap-2"
        className=""
      >
        <Form.Item
          className="w-full"
          name="author"
          rules={[{ required: true, message: "Please input author!" }]}
        >
          <Input placeholder="Author" />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <TextArea placeholder="Title" rows={2} />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea placeholder="Description" rows={4} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input content!" }]}
          className="w-full"
          name="content"
        >
          <TextEditor
            value={""}
            placeholder={"Content of article..."}
            onChange={() => {}}
          />
        </Form.Item>

        <Form.Item
          className="w-full"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload image!" }]}
        >
          <Upload
            action="https://run.mocky.io/v3/3f3dc1c7-6e80-4851-9394-74c2d97f8da7"
            listType="picture"
            maxCount={1}
            accept="image/*"
          >
            <Button
              icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
              className="flex flex-row-reverse items-center justify-between gap-2"
            >
              Upload Article Image
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item className="w-full" name="publish_at">
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder={"Published At"}
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="categories"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select
            placeholder={"Select Category"}
            // defaultValue={data?.[0]?.id}
            mode="multiple"
            options={
              categories.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            }
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="url"
          rules={[{ required: true, message: "Please input author!" }]}
        >
          <Input placeholder="URL" />
        </Form.Item>
        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 bg-primary text-white"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ModalAdd;
