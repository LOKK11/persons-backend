const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
