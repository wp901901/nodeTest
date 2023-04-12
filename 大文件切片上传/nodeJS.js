const express = require('express');
const app = express();
const multiparty = require('multiparty');// 中间件，处理FormData对象的中间件
const path = require('path');
const fse = require('fs-extra');//文件处理模块

// 读取根目录，创建一个文件夹qiepian存放切片
const UPLOAD_DIR = path.resolve(__dirname, '.', 'qiepian');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 上传
app.post('/upload', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Headers', '*');
    // 解析formData对象
    const multipart = new multiparty.Form();
    multipart.parse(req, async (err, fields, files) => {
        if (err) {    // 解析失败
            return res.send({
                state: 500,
                message: err.message
            })
        }

        // console.log('fields=', fields);
        // console.log('files=', files);

        const [file] = files.file;
        const [fileName] = fields.fileName;
        const [chunkName] = fields.chunkName;
        // 在qiepian文件夹创建一个新的文件夹，存放接收到的所有切片
        const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);
        if (!fse.existsSync(chunkDir)) {
            // 文件夹不存在，新建该文件夹
            await fse.mkdirs(chunkDir)
        }

        // // 把切片移动进chunkDir
        // await fse.move(file.path, `${chunkDir}/${chunkName}`)
        // 上传成功
        res.send({
            state: 200,
            message: '切片上传成功'
        })
    })
})

// 合并请求
app.post('/merge', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Headers', '*');
    const { fileName, size } = resolvePost(req);
    const filePath = path.resolve(UPLOAD_DIR, fileName); // 获取切片路径
    await mergeFileChunk(filePath, fileName, size)
    res.send(JSON.stringify({
        code: 200,
        message: '文件合并成功'
    }))
    // console.log(req.body);
    // req.on('data',data=>{
    //     console.log('data:',data);
    // })
})

// 合并
async function mergeFileChunk(filePath, fileName, size) {
    const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);
    let chunkPaths = await fse.readdir(chunkDir);
    chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
    const arr = chunkPaths.map((chunkPath, index) => {
        return pipeStream(
            path.resolve(chunkDir, chunkPath),
            // 在指定的位置创建可写流
            fse.createWriteStream(filePath, {
                start: index * size,
                end: (index + 1) * size
            })
        )
    })
    await Promise.all(arr)//保证所有的切片都被读取
}

// 将切片转换成流进行合并
function pipeStream(path, writeStream) {
    return new Promise((resolve, reject) => {
        // 创建可读流，读取所有切片
        const readStream = fse.createReadStream(path);
        readStream.on('end', () => {
            fse.unlinkSync(path)    // 读取完毕后，删除已经读取过的切片路径
            resolve()
        })
        readStream.pipe(writeStream)// 将可读流流入可写流
    })
}

// 解析POST请求传递的参数
function resolvePost(req) {
    // 解析参数
    return new Promise((resolve, reject) => {
        let chunk = req.body;
        // chunk += req.body;  //将接收到的所有参数进行拼接
        resolve(JSON.parse(chunk))
        // req.on('end', () => {
        //     resolve(JSON.parse(chunk))
        // })
    })

}


app.listen(3000, () => {
    console.log('express server run at http://127.0.0.1');
})
