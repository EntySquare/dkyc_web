
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

export const uploadFile = async (
  file: File,
  type: 'idcardf' | 'idcardb' | 'pdf' | 'video'
): Promise<void> => {
  try {
    // 模拟上传过程
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    // 根据 type 参数决定上传的 URL 或者处理逻辑
    const uploadUrl = {
      idcardf: 'https://example.com/upload/idcardf',
      idcardb: 'https://example.com/upload/idcardb',
      pdf: 'https://example.com/upload/pdf',
      video: 'https://example.com/upload/video',
    }[type];

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      ElMessage.success('文件上传成功');
    } else {
      ElMessage.error('文件上传失败');
    }
  } catch (error) {
    ElMessage.error('文件上传过程中发生错误');
  }
};
