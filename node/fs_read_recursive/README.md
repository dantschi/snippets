## Filesystem read, recursive

This small script writes out the sub folders and files in them recursively with file size.
It expects to be called with the folder you want to scan (`process.argv[2]`), i.e.:
`node index.js /home/user/Movies`
