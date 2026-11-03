# Dream Journal App

A full-stack web application that allows users to record their dreams and receive AI-powered interpretations using Claude.

## Features

- Record dreams with timestamp
- Get AI interpretations of your dreams
- View all past dreams and their interpretations
- Delete dreams
- SQLite database for persistent storage
- Vanilla JavaScript frontend
- Express backend with RESTful API

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: SQLite (better-sqlite3)
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **AI**: Anthropic Claude API

## Project Structure

```
dream-journal/
├── server.js           # Express server and API routes
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
├── .env.example       # Example env file
├── dreams.db          # SQLite database (auto-created)
└── public/
    ├── index.html     # Frontend HTML
    ├── styles.css     # Styles
    └── app.js         # Frontend JavaScript
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
PORT=3000
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Run the Application

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/dreams` - Get all dreams
- `GET /api/dreams/:id` - Get a specific dream
- `POST /api/dreams` - Create a new dream (requires `dream_text` in body)
- `DELETE /api/dreams/:id` - Delete a dream

## Deployment to Render

### 1. Prepare Your Repository

Make sure your code is in a Git repository (GitHub, GitLab, etc.)

### 2. Create a New Web Service on Render

1. Go to https://render.com and sign in
2. Click "New +" and select "Web Service"
3. Connect your repository
4. Configure the service:
   - **Name**: dream-journal (or your choice)
   - **Environment**: Node
   - **Build Command**: `npm ci`
   - **Start Command**: `npm start`

The project pins `sqlite3` to `5.1.7`, whose Linux native artifact supports
older glibc versions. This avoids deploying the `sqlite3` 6.x native binary,
which requires glibc 2.38 and cannot start on Render runtimes with an older
glibc.
After changing the dependency version, trigger a **Clear build cache & deploy**
in Render so an old native `node_sqlite3.node` file is not reused.

### 3. Add Environment Variables

In the Render dashboard, add:
- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_MODEL`: `gpt-4o-mini`

### 4. Deploy

Click "Create Web Service" and Render will deploy your app automatically.

### 5. Database Persistence

Note: The SQLite database file will be stored in Render's ephemeral filesystem. For production, consider:
- Using Render's persistent disk feature
- Migrating to PostgreSQL for better persistence
- Backing up data regularly

## Usage

1. Enter your dream in the text area
2. Click "Get Interpretation" to save the dream and receive an AI interpretation
3. View all your dreams below, sorted by most recent
4. Click "Delete" to remove a dream

## License

MIT