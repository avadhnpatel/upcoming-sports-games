import datetime
import csv
from sports_api_collection import game_row
import os
import asyncio
import re
from email.message import EmailMessage
from typing import Collection, List, Tuple, Union
import aiosmtplib
from mongo_tools import *
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv('HOST')
# https://kb.sandisk.com/app/answers/detail/a_id/17056/~/list-of-mobile-carrier-gateway-addresses
# https://www.gmass.co/blog/send-text-from-gmail/
CARRIER_MAP = {
    'AT&T': 'txt.att.net',
    'T-Mobile': 'tmomail.net',
    'Verizon': 'vtext.com',
    'Sprint': 'messaging.sprintpcs.com',
    'Xfinity Mobile': 'vtext.com',
    'MetroPCS': 'mymetropcs.com',
    'Boost Mobile': 'sms.myboostmobile.com',
    'Cricket Wireless': 'sms.cricketwireless.net',
    'Google Fi': 'msg.fi.google.com',
    'Tracfone': 'mmst5.tracfone.com'
}

# pylint: disable=too-many-arguments
async def send_txt(num: Union[str, int], carrier: str, email: str, pword: str, msg: str, subj: str) -> Tuple[dict, str]:
    to_email = CARRIER_MAP[carrier]

    # build message
    message = EmailMessage()
    message["From"] = email
    message["To"] = f"{num}@{to_email}"
    message["Subject"] = subj
    message.set_content(msg)

    # send
    send_kws = dict(username=email, password=pword, hostname=HOST, port=587, start_tls=True)
    res = await aiosmtplib.send(message, **send_kws)  # type: ignore
    msg = "failed" if not re.search(r"\sOK\s", res[1]) else "succeeded"
    print(msg)
    return res


async def send_txts(
    nums: Collection[Union[str, int]], carrier: str, email: str, pword: str, msg: str, subj: str) -> List[Tuple[dict, str]]:
    tasks = [send_txt(n, carrier, email, pword, msg, subj) for n in set(nums)]
    return await asyncio.gather(*tasks)

def get_all_team_names():
    leagues = ['nba', 'nfl']
    all_info = []
    for league in leagues:
        # Path to the directory
        directory = f'{league}_api_data'
        # Create an empty list to store the filenames
        filenames = []
        # Use the os.listdir function to get a list of all the files in the directory
        for file in os.listdir(directory):
            # Check if the file is a file (not a directory)
            if os.path.isfile(os.path.join(directory, file)):
                # Add the filename to the list
                filenames.append(file)
        filenames.remove('.DS_Store')
        for i in range(len(filenames)):
            file = filenames[i]
            file = " ".join(file.split('.')[0].split("-"))
            filenames[i] = file
        all_info.append(filenames)
        # The filenames are now stored in the filenames list
    return all_info

def search_csv(file_path):
    data = []
    with open(file_path, 'r') as file:
        # Create a CSV reader object
        reader = csv.reader(file)
        # Skip the header row
        next(reader)        
        # Iterate over the rows in the file
        for row in reader:
            # Convert each value to a float and append it to the data list
            data.append([x for x in row])
        file.close()
    return data

def find_files(name, path):
    matching_files = []
    for root, dirs, files in os.walk(path):
        for file in files:
            if file == name:
                subfolder = root.replace(path, '')
                matching_files.append((subfolder, file))
    return matching_files

def get_all_data(teams):
    all_rows = []
    for league_input, team_input in teams:
        team_name = "-".join(team_input.split(" "))
        league_name = "-".join(league_input.split(" "))
        # files = find_files(f'{team_name}.csv', 'data/')
        csv_data = search_csv(f'data/{league_name}_api_data/{team_name}.csv')
        for each_game in csv_data:
            curr = game_row()
            curr.normal_date, curr.team, curr.opponent, curr.score, curr.result, curr.home_or_away, curr.date_time_unix, curr.image= each_game
            all_rows.append(curr)
    return all_rows

def convert_to_cap(word):
    w = word.split(" ")
    for ind, i in enumerate(w):
        w[ind] = i[0:1].upper() + i[1:]
    return " ".join(w)

def text_number(message, number, carrier):
    _num = number
    _carrier = carrier 
    _email = os.getenv('EMAIL')
    _pword = os.getenv('PASSWORD')
    _msg = '\n' + message
    _subj = 'Upcoming Sports Games'
    coro = send_txt(_num, _carrier, _email, _pword, _msg, _subj)
    asyncio.run(coro)

def text_about_updates(days = 5):
    user_dict = get_all_userteams(current_client_link)
    for number_carrier, teams in user_dict.items():
        number, carrier = number_carrier
        cleaned_number = ''.join(filter(str.isdigit, number))
        all_team_data = []
        for team, days in teams:
            all_team_data+=get_team_games(current_client_link, team, days)
        message = '\n'
        all_team_data.sort(key=lambda x: float(x['date_time_unix']))
        for each_game in all_team_data:
            date = datetime.datetime.fromtimestamp(float(each_game['date_time_unix']))
            formatted_date = date.strftime("%A, %B %d %I:%M %p")
            home, away = each_game['home_team'], each_game['away_team']
            format_game = f'{away} @ {home}' 
            message+=format_game
            message+='\n'
            message+=f'{formatted_date}'
            message+='\n\n'
        text_number(message, cleaned_number, carrier)
    
if __name__ == "__main__":
    text_about_updates()
    
# #~/opt/anaconda3/envs/text_myself/bin/python3 ~/Desktop/text_myself/text_myself_api.py




