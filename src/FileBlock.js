import "antd/dist/antd.css";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from 'react';

export default function FileBlock() {
  const [file, setFile] = useState();

  // 清理文件
  const onRemove = (file) => {
    setFile(null);
  };

  const beforeUpload = (file) => {
    setFile(file);
    return false; // 不要现在上传
  };

  return (
    <Upload listType="picture" onRemove={onRemove} beforeUpload={beforeUpload}>
      {!file && <Button icon={<UploadOutlined />}>Select File</Button>}
    </Upload>
  );
}