# WS-Supplier

Respository yang berisi microservice Web Service Supplier. Web Service Supplier adalah API yang digunakan untuk komunikasi dengan database supplier. Database supplier dibuat dengan menggunakan DBMS mysql dengan tipe sql didalamnya berisi skema dengan informasi id bahan, nama bahan, dan harga bahan. HTTP request yang digunakan menggunakan protokol REST. Untuk mengakses informasi endpoint apa saja yang dapat diakses beserta type body request dapat menjalankan terlebih dahulu program ini seperti yang terlampir pada Prerequisite lalu mengakses pranala http://localhost:3000/ pada web browser.

## Prerequisite
#### install dependencies:

> cd expressjs
> npm install

#### how to run program:
#### On MacOS or Linux, run the app with this command:

> DEBUG=myapp:* npm start

#### On Windows Command Prompt, use this command:

> set DEBUG=myapp:* & npm start

#### On Windows PowerShell, use this command:

> $env:DEBUG='myapp:*'; npm start

##### Then load http://localhost:3000/ in your browser to access the app.