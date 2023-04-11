const express = require('express');
const app = express();
const multiparty = require('multiparty');// 中间件，处理FormData对象的中间件
const path = require('path');
const fse = require('fs-extra');//文件处理模块

// 读取根目录，创建一个文件夹qiepian存放切片
const UPLOAD_DIR = path.resolve(__dirname, '.', 'qiepian');
// app.all('/upload', (request, response) => {
//     //允许跨域 
//     response.setHeader('Access-Control-Allow-Origin', '*')
//     response.setHeader('Access-Control-Allow-Headers', '*');
//     response.send('Hello')
// })
app.post('/upload', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader('Access-Control-Allow-Headers','*');
    // 解析formData对象
    const multipart = new multiparty.Form();
    multipart.parse(req, async (err, fields, files) => {
        if (err) {    // 解析失败
            return res.send({
                state: 500,
                message: err.message
            })
        }

        console.log('fields=', fields);
        console.log('files=', files);

        const [file] = files.file;
        const [fileName] = fields.fileName;
        const [chunkName] = fields.chunkName;
        // 在qiepian文件夹创建一个新的文件夹，存放接收到的所有切片
        const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);
        if (!fse.existsSync(chunkDir)) {
            // 文件夹不存在，新建该文件夹
            await fse.mkdirs(chunkDir)
        }

        // 把切片移动进chunkDir
        await fse.move(file.path, `${chunkDir}/${chunkName}`)
        // 上传成功
        res.send({
            state: 200,
            message: '切片上传成功'
        })
    })
})


app.listen(3000, () => {
    console.log('express server run at http://127.0.0.1');
})
