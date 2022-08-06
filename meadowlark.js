const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

const fortunes = [
"Conquer your faith, either they conquer you",
"River' need flows",
"Don't be afraid of undiscovered",
"Be simple, where it goes"
]

//Настройка механизма представлений Handlebars
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

// app.get('/about', (req, res) => res.render('about'))

app.get('/axbout', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: randomFortune })
})

app.use((req, res) => {
  res.status(404)
  res.render('404')
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port};\n` +
  'Press Ctrl+C to terminate...'))

