//https://github.com/EthanRBrown/web-development-with-node-and-express-2e

const express = require('express')
const expressHandlebars = require('express-handlebars')

const fortune = require('./lib/fortune.js')

const app = express()

const handlers = require('./lib/handlers.js')

// app.get('/', handlers.home)

// app.get('/about', handlers.about)

// app.use(handlers.notFound)

// app.use(handlers.serverError)

//configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

// app.get('/about', (req, res) => res.render('about'))

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() })
})

//custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

//custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port};\n` +
  'Press Ctrl+C to terminate...'
))
