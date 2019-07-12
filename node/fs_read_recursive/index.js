const fs = require("fs");

function logSizes(path) {
    fs.readdir(path, { withFileTypes: true }, (err, dirContent) => {
        for (let i = 0; i < dirContent.length; i++) {
            let myPath = path;
            fs.stat(myPath + "/" + dirContent[i].name, (err, stat) => {
                if (err) {
                    console.log(err);
                } else {
                    if (dirContent[i].isFile()) {
                        console.log(
                            myPath + "/" + dirContent[i].name + ": " + stat.size
                        );
                    } else if (dirContent[i].isDirectory()) {
                        myPath = path + "/" + dirContent[i].name;
                        logSizes(myPath);
                    }
                }
            });
        }
    });
}

logSizes(process.argv[2]);

function mapSizes(path) {
    let retObj = {};
    let myPath;
    const dirContent = fs.readdirSync(path, { withFileTypes: true });

    for (let i = 0; i < dirContent.length; i++) {
        if (dirContent[i].isFile()) {
            let fSize = fs.statSync(path + "/" + dirContent[i].name);
            retObj[dirContent[i].name] = fSize.size;
        } else if (dirContent[i].isDirectory()) {
            myPath = path + "/" + dirContent[i].name;
            retObj[dirContent[i].name] = mapSizes(myPath);
        }
    }
    // fs.writeFileSync(
    //     __dirname + "/files.json",
    //     JSON.stringify(retObj, null, 4)
    // );

    return retObj;
}

fs.writeFileSync(
    __dirname + "/files.json",
    JSON.stringify(mapSizes(process.argv[2]), null, 4)
);

// mapSizes(process.argv[2]);

// fs.readdir(myPath, [{ withFileTypes: true }], (err, items) => {
//     // console.log(items);
//     if (err) {
//         console.log(err);
//     } else {
//         for (var i = 0; i < items.length; i++) {
//             var file = dir + "/" + items[i];
//             console.log("Start: " + file);
//
//             fs.stat(file, function(err, stats) {
//                 console.log(file);
//                 console.log(stats["size"]);
//             });
//         }
//
//         // console.log(items[i]);
//     }
// });

// readDir(dir);

// let stats = fs.stat(dir);
//
// console.log(readDir, stats);
