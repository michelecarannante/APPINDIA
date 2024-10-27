// server.js

// Parte 1: Configurazione del server e dei middleware
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Parte 2: Configurazione della connessione al database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Sostituisci con il tuo username MySQL
    password: 'AdryCin2@24',       // Sostituisci con la tua password MySQL
    database: 'appindia'
});

db.connect(err => {
    if (err) {
        console.error('Errore di connessione al database:', err);
        return;
    }
    console.log('Connesso al database MySQL.');
});

// Parte 3: Rotta per creare una prenotazione
app.post('/prenotazioni', (req, res) => {
    const { nome, cognome, email, telefono, data, fascia_oraria } = req.body;
    const sql = 'INSERT INTO prenotazioni (nome, cognome, email, telefono, data, fascia_oraria) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nome, cognome, email, telefono, data, fascia_oraria], (err, result) => {
        if (err) {
            console.error('Errore nella creazione della prenotazione:', err);
            res.status(500).send('Errore nel salvataggio della prenotazione');
            return;
        }
        res.status(201).send('Prenotazione creata con successo');
    });
});

// Parte 4: Rotta per recuperare tutte le prenotazioni
app.get('/prenotazioni', (req, res) => {
    const sql = 'SELECT * FROM prenotazioni';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Errore nel recupero delle prenotazioni:', err);
            res.status(500).send('Errore nel recupero delle prenotazioni');
            return;
        }
        res.json(results);
    });
});

// Parte 5: Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
