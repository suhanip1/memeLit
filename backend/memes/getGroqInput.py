from groq import Groq
from speech_to_text import speech_to_text
import re
import requests
from pdf_to_text import extract_text_from_pdf


api_key = "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"
client = Groq(api_key=api_key)


def get_api_response(file_name, pdf_file):
    if file_name and pdf_file :
        transcriptFinal = speech_to_text(file_name) + "/n" + extract_text_from_pdf(pdf_file)
    elif file_name :
        transcriptFinal = speech_to_text(file_name)
    elif pdf_file:
        transcriptFinal = extract_text_from_pdf(pdf_file)
    else:
        transcriptFinal = "Binary Tree"

    prompt = f"""
    Using the following transcript:

    {transcriptFinal}

    1. Provide a funny text
    2. Relate the funny text to an educational question derived from the transcript
    3. Provide 4 possible answers
    4. Provide the correct answer
    5. Provide ten of these
    6. The content should be relevant to the entire transcript provided
    7. Please dont repeat any joke again
    8. Follow this template strictly and add no other symbol or text:

    Create ten funny memes for the topic following this exact template from the funniest to least funniest:

    Joke {{INSERT JOKE NUMBER}}: {{INSERT JOKE RELATED TO THE TRANSCRIPT WITH ANSWER}}  
    Question {{INSERT QUESTION NUMBER}}: {{INSERT EDUCATIONAL QUESTION RELATED TO THE JOKE AND TRANSCRIPT}}  
    Option 1: {{INSERT CORRECT OR INCORRECT OPTION 1}}  
    Option 2: {{INSERT CORRECT OR INCORRECT OPTION 2}}  
    Option 3: {{INSERT CORRECT OR INCORRECT OPTION 3}}  
    Option 4: {{INSERT CORRECT OR INCORRECT OPTION 4}}  
    Answer: {{INSERT CORRECT OPTION NUMBER}}

    Ensure the jokes and questions are related to the transcript, dont repeat any joke, and include exactly four answer choices with only one correct answer. Follow the template precisely and avoid adding any extra information.
    """

    # Send the prompt to the API
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama3-8b-8192",
    )
    return chat_completion.choices[0].message.content

def parse_api_response(api_response):
    sections = api_response.strip().split('\n\n')
    cards = []
    try:
        for section in sections:
            lines = section.split('\n')
            if len(lines) >= 6:
                # Extract the joke number and content, and use them to form the new key
                joke_number = lines[0].split(' ')[1].strip(':')
                joke_content = lines[0].split(': ', 1)[1]
                
                # Extract the question number and content, and use them to form the new key
                question_number = lines[1].split(' ')[1].strip(':')
                question_content = lines[1].split(': ', 1)[1]

                # Extract the options and answer
                options = {lines[i].split(': ', 1)[0].strip(): lines[i].split(': ', 1)[1].strip() for i in range(2, 6)}
                answer = lines[6].replace('Answer: ', '').strip()

                # Form the dictionary with the new key format
                cards.append({
                    f'joke': joke_content,
                    f'question': question_content,
                    'options': options,
                    'answer': answer
                })
    
    except (IndexError, ValueError) as e:
        print("Parsing Error:", e)
        return "error"

    return cards

# looping 10 times to account for bad input returned from groq api
def get_api_output(file_name, pdf_file):
    max_retries = 10
    for attempt in range(max_retries):
        output = get_api_response(file_name, pdf_file)
        api_output = parse_api_response(output)
        if  not (isinstance(api_output, list)):
            print(f"Retrying due to parsing error (Attempt {attempt + 1}/{max_retries})")
        else:
            if len(api_output) > 0: 
                return api_output