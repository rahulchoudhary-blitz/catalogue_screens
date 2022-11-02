import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Card } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const UploadMedia = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  // const [imageUp, setImageUp] = useState([]);
  const [videoUp, setVideoUp] = useState([]);
  // const [sizeChartUp, setSizeChartUp] = useState([]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const beforeUploadImg = (file) => {
    const validImgCheck =
      file.type === "image/jpeg" || file.type === "image/png";
    if (!validImgCheck) {
      message.error("You can only upload jpeg/png file!");
    }
    return validImgCheck;
  };

  const beforeUploadVideo = (file) => {
    const ValidFileType =
      file.type === "video/mov" ||
      file.type === "video/wmv" ||
      file.type === "video/mp4" ||
      file.type === "video/avi" ||
      file.type === "video/flv" ||
      file.type === "video/mkv";
    if (!ValidFileType) {
      message.error(
        "You can only upload .mp4, .mov, .wmv, .avi, .flv, .mkv file"
      );
    }
    if (ValidFileType) setVideoUp([...videoUp, file]);
    return false;
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload image
      </div>
    </div>
  );

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="Upload media for catalogues"
          bordered={false}
          style={{ margin: "6px" }}
        >
          <Form.Item name="image">
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept=".jpg, jpeg, .png"
              beforeUpload={beforeUploadImg}
              onChange={handleChange}
            >
              + Upload Images
            </Upload>
          </Form.Item>

          <Form.Item name="video">
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept=".mp4, .mov, .wmv, .avi, .flv, .mkv"
              beforeUpload={beforeUploadVideo}
              onChange={handleChange}
            >
              {videoUp.length >= 2 ? null : "+ Upload Videos"}
            </Upload>
          </Form.Item>
          <Form.Item name="video">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              maxCount={2}
              showUploadList={false}
              accept=".jpg, jpeg, .png"
              beforeUpload={beforeUploadImg}
              onChange={handleChange}
            >
              +Upload Size Chart
            </Upload>
          </Form.Item>
        </Card>
      </div>
    </>
  );
};
export default UploadMedia;
