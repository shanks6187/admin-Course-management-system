import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import cloud from 'leancloud-storage'
import { promises } from 'dns';
import { userAppSelector } from '@/store/modules/hook';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

//将图片变成base64格式
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
//上传之前进行处理
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface ImgUploadProps{
        onChange?:(url:string)=>void,
        value?:string
    }

const ImgUpload: React.FC<ImgUploadProps> = (props) => {
    //from组件嵌套子组件，函数组件中会默认接收一个props
    //props中有value和onChange，调用onChange传入的值会改变value，该value会被父组件from给接收
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
    
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  

  let  user = userAppSelector(storeage=>storeage.user)
  
  
  const handleUpload = (data:any)=>{
    
    getBase64(data.file,(base64)=>{
      //第一个参数是图片名称，第二个参数是文件的base64数据
        let file= new cloud.File(data.file.name,{base64})
        file.save().then(res=>{
            const url = res.url()
            setImageUrl(url)
            props.onChange && props.onChange(url)
        })
    })
  }
  

  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={handleUpload}
      >
        {imageUrl||user.userInfo ? <img src={imageUrl||user.userInfo?.poster} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </Flex>
  );
};

export default ImgUpload;