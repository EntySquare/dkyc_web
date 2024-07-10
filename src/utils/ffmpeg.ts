import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

interface FfmpegFunctions {
    compressVideo(file: File, filename: string, filetype: string, msg: string): Promise<Blob>
}

const ffmpegFunctions: FfmpegFunctions = {
    compressVideo: async (file: File, filename: string, filetype: string, msg: string) => {
        console.log('file', file);
        console.log('filename', filename);

        // 分辨率
        const resolution = `1280x720`;
        // 实例化ffmpeg
        const ffmpegObj = createFFmpeg({
            // ffmpeg路径
            corePath: 'ffmpeg-core.js',
            // 日志
            log: true,
            // 进度
            progress: ({ratio}) => {
                msg = `完成率: ${(ratio * 100.0).toFixed(1)}%`;
            }
        })

        var {name} = file;
        // msg = '正在加载 ffmpeg-core.js'
        // 开始加载
        await ffmpegObj.load();
        // msg = '开始压缩'
        // 把文件加到ffmpeg   写文件
        ffmpegObj.FS('writeFile', name, await fetchFile(file));
        // await ffmpeg.run('-i', name, '-b', '2000000', '-fs', '4194304', '-preset medium', 'superfast', 'output.mp4')
        // 开始压缩视频
        // const compressedFileSize = this.computeFileSize(file).toString();
        // console.log("After compression,this file size is " + compressedFileSize + " Bytes.");
        await ffmpegObj.run('-i', name, '-b', '2000000', '-crf', '22', 'output.mp4');
        // msg = '压缩完成'
        // 压缩所完成，   读文件  压缩后的文件名称为 output.mp4
        const data = await ffmpegObj.FS('readFile', 'output.mp4');

        // 转换bolb类型
        return new Blob([data], {type: 'text/plain;charset=utf-8'})
        // return new Promise((resolve, reject) => {
        //     const file = new window.File([blob], filename, {type: filetype});
        //     resolve(file);
        // })
    }
}

export default ffmpegFunctions;
