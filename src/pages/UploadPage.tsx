import { CaretRightOutlined, InboxOutlined } from '@ant-design/icons';
import { Alert, Button, Space, Upload } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadQuery } from '../apis';

const { Dragger } = Upload;

const UploadPage = () => {
  const [image, setImage] = useState<File>();

  const navigate = useNavigate();

  const { loading, runAsync } = useUploadQuery();

  return (
    <Space className="w-full" direction="vertical">
      <Alert
        message="注意事项"
        description="请检查您的图片，上传无障碍设施图像（允许jpg、png格式）"
        type="info"
        showIcon
      />
      <Dragger
        accept="image/*"
        listType="picture"
        maxCount={1}
        beforeUpload={() => false}
        onChange={({ fileList }) => setImage(fileList[0]?.originFileObj)}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
      </Dragger>
      <Button
        type="primary"
        icon={<CaretRightOutlined />}
        loading={loading}
        disabled={!image}
        onClick={async () => {
          if (image) {
            const imageId = await runAsync({ image });
            navigate(`/detect/${imageId}`);
          }
        }}
      >
        开始识别
      </Button>
    </Space>
  );
};

export default UploadPage;
