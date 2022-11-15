const fs = require('fs');
// 读取内容
// fs.readFile('D:/Wepeng/study/nodeTest/fs/chengji.txt','utf8',(err,dataStr)=>{
//     console.log(err);
//     console.log('---------');
//     console.log(dataStr);
// })

// 读取内容的方法
function fsReadFile(path, encoding = 'utf8') {
    // 同步方法
    let fileContent = fs.readFileSync(path, encoding);
    // 异步方法
    // fs.readFile(path,encoding,(err,dataStr)=>{
    //     if(err) { res = err}
    //     else { res = dataStr}
    //     console.log(err);
    //     console.log('---------');
    //     console.log(dataStr);
    // })
    return fileContent;
}

// 写入内容的方法
function fsWriteFile(file,data){
    let writeFile = fs.writeFileSync(file,data);
    return writeFile
}



// fsReadFile('A:/Wepeng/study/nodeTest/fs/chengji.txt')

// 写入内容

/**
 * 1：使用fs.readFile方法，读取素材目录下的chengji.txt文件
 * 2：判断文件是否读取成功，读取成功处理成绩数据
 * 3：将处理完成的成绩数据，调用fs.writeFile()方法，写入到新文件 chenji-ok.txt中
 */

// let resFile = fsReadFile('D:/Wepeng/study/nodeTest/fs/chengji.txt');
// let resFileArr = resFile.replace(/=/g, ':').split(' ').map((el, i) => `${i + 1} ${el}\r\n`).join('');
// fsWriteFile('D:/Wepeng/study/nodeTest/fs/chengji-ok.txt',resFileArr)

// 使用__dirname，表示当前文件所处目录
let resFile = fsReadFile(__dirname + '/chengji.txt');
let resFileArr = resFile.replace(/=/g, ':').split(' ').map((el, i) => `${i + 1} ${el}\r\n`).join('');
console.log(__dirname,resFileArr);
fsWriteFile(__dirname + 'chengji-ok.txt',resFileArr)