import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

let ffmpeg = {};

ffmpeg.squeezVideo = async function (file, filename, filetype, msg) {
    console.log('file', file);
    console.log('filename', filename);
    console.log('filetype', filetype);

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
    const compressedFileSize = this.computeFileSize(file);
    console.log("After compression,this file size is " + compressedFileSize + " Bytes.");
    await ffmpegObj.run('-i', name, '-b', '2000000', '-crf', '18', '-fs', compressedFileSize, '-s', resolution, 'output.mp4');
    // msg = '压缩完成'
    // 压缩所完成，   读文件  压缩后的文件名称为 output.mp4
    const data = await ffmpegObj.FS('readFile', 'output.mp4');

    // 转换bolb类型
    const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});

    return new Promise((resolve, reject) => {
        const file = new window.File([blob], filename, {type: filetype});
        resolve(file);
    })
}

ffmpeg.computeFileSize = function (file) {
    if (!file) {
        return '0';
    }
    if (file.size / 1024 / 1024 > 100) {
        //50M
        return '52275200';
    } else if (file.size / 1024 / 1024 <= 100 && file.size / 1024 / 1024 > 50) {
        return file.size / 2;
    } else {
        return file.size;
    }
}

// 获取上传视频的url
ffmpeg.getObjectURL = function (file) {
    let url = null;
    window.URL = window.URL || window.webkitURL;
    if (window.URL) {
        url = window.URL.createObjectURL(file);
    } else {
        url = URL.createObjectURL(file);
    }
    return url;
}

// 获取视频的宽高分辨率
ffmpeg.getVideoData = function () {
    return new Promise((resolve, reject) => {
        const videoElement = document.getElementById('DeclarationVideoVideo');
        videoElement.addEventListener('loadedmetadata', function () {
            resolve({
                width: this.videoWidth,
                height: this.videoHeight,
                duration: this.duration
            })
        });
    })
}

export default ffmpeg;
