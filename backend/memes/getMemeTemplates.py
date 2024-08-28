import requests
import random
from getGroqInput import get_api_output
from groq import Groq

api_key = "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"
client = Groq(api_key=api_key)

def get_meme_templates():
    url = "https://api.imgflip.com/get_memes"
    response = requests.get(url)
    data = response.json()
    if data['success']:
        memes = data['data']['memes']
        return memes[:100]
    else:
        return None

def generate_meme(template_id, text0, text1):
    url = "https://api.imgflip.com/caption_image"
    params = {
        'template_id': template_id,
        'username': 'memeify23',  
        'password': 'memeify12',  
        'text0': text0,
        'text1': text1
    }
    response = requests.post(url, data=params)
    data = response.json()
    if data['success']:
        return data['data']['url']
    return None

def select_meme_template_using_groq(joke_content, meme_templates, used_ids):
    meme_template_info = [(template['name'], template['id']) for template in meme_templates]
    
    prompt = f"""
    Given the following joke content:
    "{joke_content}"
    
    And the following meme templates with corresponding IDs:
    {', '.join(f"{name} (ID: {id})" for name, id in meme_template_info)}

    Which meme template is the most appropriate for the joke content? Respond with the exact template name and ID. 
    Important! Please don't select the same meme more than once.
    Follow this strict template DO NOT add additional information:
    name: [insert meme name here]
    id: [insert template id here]
    reason: [insert reason for picking]
    """

    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama3-8b-8192",
    )
    
    best_template_info = response.choices[0].message.content.strip()
    name, meme_id = extract_name_and_id(best_template_info)

    # Check if the selected meme ID has been used before
    if meme_id in used_ids:
        # Select a random meme template that hasn't been used
        remaining_templates = [template for template in meme_templates if template['id'] not in used_ids]
        if remaining_templates:
            random_template = random.choice(remaining_templates)
            name = random_template['name']
            meme_id = random_template['id']
    
    # Add the selected meme ID to the used list
    used_ids.add(meme_id)

    return name, meme_id

def extract_name_and_id(text):
    lines = text.split('\n')
    name = None
    meme_id = None
    for line in lines:
        if 'name:' in line:
            name = line.split('name:')[1].strip()
        elif 'id:' in line:
            meme_id = line.split('id:')[1].strip()
    return name, meme_id

def set_template_ids(file_name, pdf_file):
    api_output = get_api_output(file_name, pdf_file)

    if isinstance(api_output, list):
        used_ids = set()  # To track used meme IDs
        meme_templates = get_meme_templates()

        for joke_data in api_output:
            joke_content = joke_data["joke"]
            selected_name, selected_id = select_meme_template_using_groq(joke_content, meme_templates, used_ids)
            joke_data["name"] = selected_name
            joke_data["id"] = selected_id

        for joke_data in api_output:
            joke_parts = joke_data["joke"].split("?")
            joke_data["joke"] = joke_parts[0] + "?"
            joke_data["joke-followUp"] = joke_parts[1]
            joke_data["url"] = generate_meme(joke_data["id"], joke_data["joke"], joke_data["joke-followUp"])
            print(joke_data["joke"], joke_data["url"])

        return api_output

    else:
        print("Invalid joke content.")

