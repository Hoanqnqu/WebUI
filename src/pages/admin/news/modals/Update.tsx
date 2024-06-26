import { Button, DatePicker, Form, Input, Select, Spin, Upload, UploadFile } from "antd";
import { IModal } from "@/interfaces/modal.interface";
import Title from "@/components/Modal/Title";
import TextEditor from "../TextEditor"; // Ensure the correct path
import { AiOutlineUpload } from "react-icons/ai";
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service";
import { normFile, uploadImageFormData } from "@/utils/helpers";
import moment from "moment";
import { useUpdateNewsMutation } from "@/redux/services/news/news.service";
import { useUploadImagesMutation } from "@/redux/services/help/help.service";
import useServerMessage from "@/hooks/useServerMessage";

const { TextArea } = Input;

const ModalUpdate = (props: IModal) => {
    const { title, data: news } = props;
    const categories = useGetCategoriesQuery("");
    const [updateArticle, { data, error, isLoading }] = useUpdateNewsMutation();
    const [
        uploadImage,
        { data: dataUpload, error: errorUpload, isLoading: isLoadingUpload },
    ] = useUploadImagesMutation();
    useServerMessage({ data: data!, error: error });
    useServerMessage({ data: dataUpload!, error: errorUpload });

    const defaultFileList: UploadFile<any>[] = [
        {
            uid: "-1", // Unique identifier, negative values are reserved for default files
            name: "image", // File name
            status: "done", // Status of the file: done, uploading, error, removed
            url: news.image_url, // URL of the image
        },
    ];
    

    const onFinish = async (values: any) => {
        values.image_url = news.image_url;
        if (values.image) {
            const formData = uploadImageFormData(values);
            const res = await uploadImage(formData).unwrap();
            if (res.status == "201" && res.data) {
                values.image_url = res.data;
            } else {
                console.log("upload error");
            }
        }
        await updateArticle({ ...values, id: news.id });
    };

    return (
        <Spin spinning={isLoading || isLoadingUpload}>
            <Title>{title}</Title>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 100 }}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    author: news.author,
                    title: news.title,
                    description: news.description,
                    content: news.content,
                    categories: news.categories.filter((catId: string) => {
                        const cat = categories.data?.find((c) => `${c.id}` == catId)
                        return cat?.id
                    }
                    ),
                    image_url: news.image_url,
                    publish_at: moment(news.publish_at),
                    url: news.url
                }}
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
                    className="w-full"
                    name="content"
                    rules={[{ required: true, message: "Please input content!" }]}
                >
                    {/* @ts-ignore */}
                    <TextEditor placeholder="Write something amazing..." />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        listType="picture"
                        maxCount={1}
                        accept="image/*"
                        defaultFileList={defaultFileList}
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
                <Form.Item className="w-full" name="categories">
                    <Select
                        mode="multiple"
                        placeholder={"Select Category"}
                        value={news.categories}
                        defaultValue={news.categories}
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

export default ModalUpdate;
