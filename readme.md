# CSV User Uploader

This project is a simple web application that allows you to upload a CSV file containing user data, store it in a PostgreSQL database, and generate a report on the uploaded data.

## Features

- Upload CSV files with user information (name, age, address, additional info)
- Store data in a PostgreSQL database
- View a report summarizing the uploaded data (e.g., age distribution)
- User-friendly web interface

## Tech Stack

- **Backend:** Node.js (Express)
- **Frontend:** HTML, CSS, JavaScript
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Configure environment variables:**

   Create a `.env` file in the root directory with the following content (edit as needed):

   ```
   POSTGRES_USER=youruser
   POSTGRES_PASSWORD=yourpassword
   POSTGRES_DB=yourdb
   DB_URL=postgres://youruser:yourpassword@db:5432/yourdb
   CSV_FILE_PATH=./uploads
   PORT=3000
   ```

3. **Start the application:**

   ```bash
   docker-compose up --build
   ```

4. **Access the app:**

   Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Prepare your data:**
   - Copy and paste the following into `data/users.db`:

     ```
     name.firstName,name.lastName,age,address.line1,address.city,gender
     Darian,Miller,65,637 Heron Close,Fort Kaleb,other
     Orie,Hackett,36,47060 Hickle Gardens,Lake Lylahaven,female
     Saige,Koss,63,8746 Crooks Mountains,Lake Maymieburgh,female
     Alyson,Cummings,53,1590 Grange Close,Rudyfurt,male
     Bryana,Schultz,52,656 Greenholt Corners,Fort Caleigh,other
     Ellen,Quigley,25,179 Shanahan Union,Baton Rouge,female
     Zola,Reynolds,37,5526 Commerce Street,Bradfordhaven,female
     Boyd,Walsh,45,68919 Memorial Drive,North Tristinborough,male
     Einar,Watsica,19,520 Stanford Grove,Pine Hills,female
     Loren,King,23,64984 Gleason Land,Lake Derrickshire,male
     Dusty,Hammes,13,5375 Funk Overpass,East Madyson,male
     Jamar,Zieme,39,855 E Front Street,Lake Gussieberg,male
     Prudence,Hand,79,89723 Buckingham Road,Port Junius,female
     Deborah,Jones,89,1367 Brook Road,Lake Emily,female
     Dorothy,Wolf,65,379 E Church Street,New Abby,male
     Berniece,Nienow,22,16532 Sauer Throughway,New Kelvin,other
     Elnora,Auer,53,9059 Sycamore Close,Lake Aureliamouth,female
     Marcella,Dooley,42,7540 Abbie Roads,Lauriannecester,other
     Deja,Paucek,41,724 Katrine Rue,Fort Deshawnland,female
     ```

   - Save the file.

2. **Upload the CSV File:**
   - Click the "Choose File" button and select your `users.db` file.
   - Click "Upload" to send the file to the server.

2. **View Report:**
   - Click the "Fetch Report" button to see a summary of the uploaded data.

📋 CSV Format
Your file must follow this structure:

Column	Type	Description
name.firstName	String	First name of the user
name.lastName	String	Last name of the user
age	Number	Age in years
address.line1	String	Street address
address.city	String	City name
gender	String	Gender: male, female, other

| Column           | Type   | Description                    |
|------------------|--------|--------------------------------|
| name.firstName   | String | First name of the user         |
| name.lastName    | String | Last name of the user          |
| age              | Number | Age in years                   |
| address.line1    | String | Street address                 |
| address.city     | String | City name                      |
| gender           | String | Gender: male, female, or other |

---

## 📦 Folder Structure

```
csv-to-json-api/
├── data/
│   └── users.csv
├── node_modules/
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── utils/
│   ├── csvParser.js
│   └── generateCSV.js
├── .dockerignore
├── .env
├── .gitignore
├── app.js
├── db.js
├── docker-compose.yaml
├── Dockerfile
├── init.sql
├── package-lock.json
├── package.json
└── readme.md

 
```