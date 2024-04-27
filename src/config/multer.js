import multer from 'multer'

let fotoNombre

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const nombreNuevo = `${Date.now()}-${file.originalname}`
    fotoNombre = nombreNuevo
    cb(null, nombreNuevo)
  }
})

export const uploadFile = multer({ storage })

export { fotoNombre }

// function imageFilter (req, file, cb) {
//   const permitidos = ['image/jpeg', 'image/png']
//   if (permitidos.includes(file.mimetype)) {
//     cb(null, true)
//   } else {
//     cb(console.log('solo se permite subir images'), false)
//   }
// }

// function pdfFilter (req, file, cb) {
//   const permitidos = ['application/pdf']
//   if (permitidos.includes(file.mimetype)) {
//     cb(null, true)
//   } else {
//     cb(console.log('solo se permite subir pdf'), false)
//   }
// }

// export const imagenMulter = multer({ storage, imageFilter })
// export const pdfMulter = multer({ storage, pdfFilter })
