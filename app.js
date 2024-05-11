const yargs = require('yargs')
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts.js')

// command untuk menambahkan contact baru
yargs.command({
    command: 'add',
    describe: 'Menambahkan Contact Baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        noHP: {
            describe: 'No HP',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
    },
    // handler untuk menangkap argumen yg dimasukkan
    handler(argv){
        simpanContact(argv.nama, argv.noHP, argv.email)
    }
}).demandCommand()

// command untuk melihat contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan Nama dan No HP Contact',
    handler(){
        listContact()
    }
})

// command untuk menampilkan detail contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan Detail Nama dan No HP Contact',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        detailContact(argv.nama)
    }
})

// command untuk menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus Contact',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        deleteContact(argv.nama)
    }
})


yargs.parse()