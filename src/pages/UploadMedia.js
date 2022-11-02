import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Card, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const UploadMedia = () => {
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState([]);
  const [videoUpload, setVideoUpload] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [sizeChartUpload, setSizeChartUpload] = useState([]);

  //image upload
  const beforeUploadImg = (file) => {
    setImageUpload([...imageUpload, file]);
    return false;
  };

  const removeImage = (file) => {
    setImageUpload(imageUpload.filter((item) => item.uid !== file.uid));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  /**
   * validation video upload
   * @param {*} file
   * @returns Boolean
   */
  const beforeUploadVideo = (file) => {
    const validFileType =
      file.type === "video/mov" ||
      file.type === "video/wmv" ||
      file.type === "video/mp4" ||
      file.type === "video/avi" ||
      file.type === "video/flv" ||
      file.type === "video/mkv";
    if (!validFileType) {
      message.error(
        "You can only upload .mp4, .mov, .wmv, .avi, .flv, .mkv file"
      );
    }
    if (validFileType) setVideoUpload([...videoUpload, file]);
    return false;
  };

  const removeVideo = (file) => {
    setVideoUpload(videoUpload.filter((item) => item.uid !== file.uid));
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
  const handleCancel = () => setPreviewOpen(false);

  /**
   * chartImg
   */
  const beforeSizeChartUpload = (file) => {
    setSizeChartUpload([...sizeChartUpload, file]);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);
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
              maxCount={10}
              accept=".jpg, jpeg, .png"
              beforeUpload={beforeUploadImg}
              onRemove={removeImage}
              onPreview={handlePreview}
            >
              + Upload Images
            </Upload>
          </Form.Item>

          <Form.Item name="video">
            <Upload
              listType="picture-card"
              beforeUpload={beforeUploadVideo}
              maxCount={2}
              accept=".mp4, .mov, .wmv, .avi, .flv, .mkv"
              onRemove={removeVideo}
              onPreview={handlePreview}
            >
              {videoUpload.length >= 2 ? null : "+ Upload Videos"}
            </Upload>
          </Form.Item>
          <Form.Item name="video">
            <Upload
              name="avatar"
              listType="picture-card"
              maxCount={1}
              accept=".jpg, jpeg, .png"
              beforeUpload={beforeSizeChartUpload}
              onChange={handleChange}
              onPreview={handlePreview}
              onRemove={removeImage}
            >
              {fileList.length >= 1 ? null : "+ Upload Size Chart"}
            </Upload>
          </Form.Item>
          <Modal
            visible={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Card>
      </div>
    </>
  );
};
export default UploadMedia;
