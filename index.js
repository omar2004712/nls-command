#!/usr/bin/env node
const fs = require('fs');
const { lstat } = fs.promises;
const { cwd } = process;

fs.readdir(cwd(), async (err, files) => {
    if(err){
        console.log(err)
        return;
    }
    const stats = files.map((file)=>{
        return lstat(file);
    })
    Promise.all(stats).then((stats) => {
        stats.forEach((stat, index)=>{
            if(stat.isDirectory()){
                console.log(files[index] + '/');
            }
            else {
                console.log(files[index])
            }
        })
    }).catch(err => {
        console.log(err)
    })
})