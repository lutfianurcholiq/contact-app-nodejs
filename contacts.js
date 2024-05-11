const fs = require('fs') 
const validator = require('validator')
// const readline = require('readline') 

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// melakukan cek folder data
const folderPath = './data'
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
}

// melakukan cek file contacts.json
const filePath = './data/contacts.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

// membuat promise untuk pertanyaan
// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama)
//         })
//     })
// }

// fungsi untuk load contact
const loadContact = () => {
    // melakukan pembuatan file contacts.json
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    // melakukan convert ke json
    const contacts = JSON.parse(file)

    return contacts
}

// fungsi untuk menambahkan data contact baru
const simpanContact = (nama, noHP, email) => {

     // melakukan inisialisasi untuk menangkap input
     const contact = { nama, noHP, email }
    //  // melakukan pembuatan file contacts.json
    //  const file = fs.readFileSync('data/contacts.json', 'utf-8')
    //  // melakukan convert ke json
    //  const contacts = JSON.parse(file)

    // memanggil fungsi load contact
    const contacts = loadContact()

    //  melakukan cek duplicate dengan yg di contacts.json
     const duplicate = contacts.find((contact) => contact.nama === nama)

     if (duplicate) {
        console.log('Nama Sudah Ada Dalam Contact, Silahkan Gunakan Nama Lain')
        return false
     }

     // melakukan cek noHP
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log('Input No HP Tidak Sesuai, Silahkan Masukkan Kembali')
        return false
    }

    //  melakukan cek email apakah benar
    if (email) {
        if (!validator.isEmail(email)) {
            console.log('Input Email Salah, Silahkan Masukkan Kembali')
            return false
        }
    }
 
     // melakukan push ke contacts
     contacts.push(contact)
 
     // melakukan write ke file, tapi harus diconvert terlebih dahulu ke string lagi
     fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
 
     console.log('Terimakasih sudah menginputkan contact')
 
    // rl.close()
}

// fungsi untuk menampilkan contact
const listContact = () => {
    const contacts = loadContact()
    console.log('Daftar Contact')
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`)
    });
}

// fungsi untuk menampilkan detail contact
const detailContact = (nama) => {
    const contacts = loadContact()

    // mencari berdasarkan nama
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if(!contact) {
        console.log('Nama Tidak Ada Dalam Contact')
        return false
    }

    console.log(`${contact.nama}`)
    console.log(`${contact.noHP}`)
    console.log(`${contact.email}`)
}

// fungsi untuk menghapus contact
const deleteContact = (nama) => {
    const contacts = loadContact()

    // melakukan filter data contact
    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

    // console.log(newContact)

    if (contacts.length === newContact.length) {
        console.log(`Nama ${nama} Tidak Ditemukan Dalam Contact`)
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact))

    console.log(`Data Contact ${nama} Berhasil DiHapus`)
}


module.exports = { simpanContact, listContact, detailContact, deleteContact }