# memeLit

Upload a PDF of notes or an MP3 of a lecture, and memeLit uses AI to turn it into funny quiz-style memes for studying.

## How it works
1. Extract text from the PDF (PyMuPDF) and/or transcribe the audio (AssemblyAI)
2. Send the transcript to Groq (`llama3-8b-8192`) to generate 10 joke/quiz-question pairs with 4 answer choices each
3. Groq picks a fitting Imgflip meme template for each joke
4. Imgflip renders the captioned meme image

## Tech stack
- **Frontend:** React 18 + TypeScript, Vite, MUI, React Router
- **Backend:** Django 5 + DRF, PyMuPDF, AssemblyAI, Groq, Imgflip API

## Getting started

```bash
# backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt django djangorestframework django-cors-headers
python manage.py migrate && python manage.py runserver

# frontend
cd frontend
npm install && npm run dev
```
