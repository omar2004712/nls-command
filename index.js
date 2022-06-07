#!/usr/bin/env node
const colors = require('colors');

colors.enable()

const fs = require('fs');
const { lstat } = fs.promises;
const { cwd } = process;
const path = require('path')

const target = process.argv[2] || cwd();

fs.readdir(target, async (err, files) => {
    if(err){
        console.log(err)
        return;
    }
    const stats = files.map((file)=>{
        return lstat(path.join(target, file));
    })
    Promise.all(stats).then((stats) => {
        stats.forEach((stat, index)=>{
            if(stat.isDirectory()){
                console.log((files[index] + '/').bold.blue + '\t');
            }
            else {
                console.log(files[index] + '\t')
            }
        })
    }).catch(err => {
        console.log(err)
    })
})