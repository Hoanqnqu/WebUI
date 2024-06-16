import { IModal } from "@/interfaces/modal.interface";
import { Divider, Image, Typography } from "antd";
import ReactHtmlParser from "react-html-parser";
const { Title, Paragraph, Text } = Typography;

// import "./style.css";
import moment from "moment";
const ModalView = (props: IModal) => {
  
  const { data: news } = props;
  return (
    <Typography>
      <Title>{news.title}</Title>
      <Divider />
      <div className="flex items-center w-full justify-center">
        <Image
          width={400}
          height={200}
          src={news.image_url}
          className="rounded-lg items-center justify-center"
          alt="article-image"
        />
      </div>

      <Text italic>
        <br />
        {news.description}
      </Text>

      <Paragraph>
        <br />
        {ReactHtmlParser(news.content)}
      </Paragraph>
      <Text italic>
        Tác giả: {news.author} <br />
      </Text>
      <Text strong>
        Xuất bản lúc:{" "}
        {moment(news.publish_at).format("YYYY-MM-DD HH:mm:ss")}
      </Text>
    </Typography>
  );
};

export default ModalView;
