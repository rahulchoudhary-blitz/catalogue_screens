import React, { useState } from "react";
import { Typography, Card, Button } from "antd";
import "./pages.module.css";
import { CloseOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const CardCataloge = () => {
  const [dismissed, dismiss] = useState(false);
  if (dismissed) return <></>;
  return (
    <div
      className="site-card-wrapper"
      style={{ margin: "6px", borderLeft: "2px solid green" }}
    >
      <Card className="left-border">
        <Title style={{ textAlign: "left" }} ellipsis={true} level={2}>
          Create catalogue
        </Title>
        <Paragraph
          style={{ textAlign: "left" }}
          ellipsis={{ rows: 3, expandable: true }}
        >
          {" "}
          Create your catalogue by uploading media and adding necessary details.
        </Paragraph>
        <Button
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={() => dismiss(true)}
          type="text"
          icon={<CloseOutlined />}
        />
      </Card>
    </div>
  );
};

export default CardCataloge;
