import os
import csv 
import json
from datetime import datetime
import requests
import requests

class game_row():
    def __init__(self, home_team="", away_team = "", date_time_unix="", normal_date = "", home_image="", away_image ="", league=""):
        self.home_team = home_team
        self.away_team = away_team
        self.date_time_unix = date_time_unix
        self.normal_date = normal_date
        self.home_image = home_image
        self.away_image = away_image
        self.league = league

    def turn_to_array(self):
        return [self.home_team, self.away_team, self.date_time_unix, self.normal_date, self.home_image, self.away_image, self.league]

    def turn_to_dic(self):
        return {
                'home_team': self.home_team,
                'away_team': self.away_team,
                'date_time_unix': self.date_time_unix,
                'normal_date': self.normal_date,
                'home_image': self.home_image,
                'away_image': self.away_image,
                'league': self.league,
            }

def football_data_collection_database(league_id, year):
    football_games = []
    not_allowed = {'AFC', 'NFC'}
    key = '8761add519b3bd6803a73cceea02f369'
    link = f'https://v1.american-football.api-sports.io/games?league={league_id}&season={year}'
    headers = {
        "x-rapidapi-key": key
    }
    response1 = requests.request("GET", link, headers=headers)
    quote1 = json.loads(response1.text)
    for i in quote1['response']:
        if (int(i['game']['date']['timestamp']) >= int(datetime.now().timestamp())) and i['teams']['home']['name']!=None and i['teams']['home']['name'] not in not_allowed:
            game = game_row()      
            homeName, homeImageUrl = i['teams']['home']['name'], i['teams']['home']['logo'] 
            awayName, awayImageUrl = i['teams']['away']['name'], i['teams']['away']['logo']
            game.home_team, game.home_image, game.away_team, game.away_image, game.league = homeName, homeImageUrl, awayName, awayImageUrl, i['league']['name']
            game.date_time_unix, game.normal_date = i['game']['date']['timestamp'], i['game']['date']['date']
            football_games.append(game)
    return football_games
    # write_csv(football_games)
    
def league_soccer_data_collection(league_id, year):
    soccer_games = []
    key = '8761add519b3bd6803a73cceea02f369'
    link = f'https://v3.football.api-sports.io/fixtures?league={league_id}&season={year}'
    headers = {
        "x-rapidapi-key": key
    }
    response1 = requests.request("GET", link, headers=headers)
    quote1 = json.loads(response1.text)
    for i in quote1['response']:
        if (int(i['fixture']['timestamp']) >= int(datetime.now().timestamp())) and i['teams']['home']['name']!=None:
            game = game_row()      
            homeName, homeImageUrl = i['teams']['home']['name'], i['teams']['home']['logo'] 
            awayName, awayImageUrl = i['teams']['away']['name'], i['teams']['away']['logo']
            game.home_team, game.home_image, game.away_team, game.away_image, game.league = homeName, homeImageUrl, awayName, awayImageUrl, i['league']['name']
            game.date_time_unix, game.normal_date = i['fixture']['timestamp'], datetime.fromtimestamp(float(i['fixture']['timestamp'])).strftime("%Y-%m-%d")
            soccer_games.append(game)
    return soccer_games
    # write_csv(soccer_games)
        
def general_data_collection(link):    
    games = []
    key = '8761add519b3bd6803a73cceea02f369'
    headers = {
        "x-rapidapi-key": key
    }
    response1 = requests.request("GET", link, headers=headers)
    quote1 = json.loads(response1.text)
    for i in quote1['response']:
        if (int(i['timestamp']) >= int(datetime.now().timestamp())) and i['teams']['home']['name']!=None:
            game = game_row()      
            homeName, homeImageUrl = i['teams']['home']['name'], i['teams']['home']['logo'] 
            awayName, awayImageUrl = i['teams']['away']['name'], i['teams']['away']['logo']
            game.home_team, game.home_image, game.away_team, game.away_image, game.league = homeName, homeImageUrl, awayName, awayImageUrl, i['league']['name']
            game.date_time_unix, game.normal_date = i['timestamp'], i['date']
            games.append(game)
    return games
    # write_csv(games)
    
def reset_files():
    os.unlink('alldata.csv')
    f = open('alldata.csv', 'w')
    writer = csv.writer(f)
    writer.writerow(['home_team','away_team','date_time_unix','normal_date','home_image','away_image','league'])
    f.close()    

def all_baseball():
    year='2023'
    league_id='1'
    link = f'https://v1.baseball.api-sports.io/games?league={league_id}&season={year}'
    return general_data_collection(link)

def all_basketball():
    all_data = []
    year='2022-2023'
    leagues = [('12', 'nba'), ('116', 'ncaamb')]
    for league_id, league_name in leagues:
        link = f'https://v1.basketball.api-sports.io/games?league={league_id}&season={year}'
        all_data += general_data_collection(link)
    return all_data

def all_football():
    all_data = []
    year='2022'
    leagues = [('1', 'nfl')]
    for league_id, _ in leagues:
        all_data += football_data_collection_database(league_id, year)
    return all_data

def all_hockey():
    year='2022'
    league_id='57'
    link = f'https://v1.hockey.api-sports.io/games?league={league_id}&season={year}'
    return general_data_collection(link)

def all_league_soccer():
    all_data = []
    year = '2022'
    league_ids=[2, 39, 140, 253, 61, 78, 45, 3]
    # uefa champions league, premier league, la liga, MLS, Ligue 1, Bundesliga, FA Cup, uefa Europa League
    for league_id in league_ids:
        all_data += league_soccer_data_collection(league_id, year) 
    return all_data

def get_all_teams():
    all_teams = {}
    links = ['https://v1.hockey.api-sports.io/games?league=57&season=2022',
            'https://v1.basketball.api-sports.io/games?league=12&season=2022-2023',
            'https://v1.basketball.api-sports.io/games?league=116&season=2022-2023', 
            'https://v1.baseball.api-sports.io/games?league=1&season=2023',
            'https://v1.american-football.api-sports.io/games?league=1&season=2022',
            'https://v3.football.api-sports.io/fixtures?league=2&season=2022',
            'https://v3.football.api-sports.io/fixtures?league=39&season=2022',
            'https://v3.football.api-sports.io/fixtures?league=140&season=2022',
            'https://v3.football.api-sports.io/fixtures?league=253&season=2022',
            'https://v3.football.api-sports.io/fixtures?league=61&season=2022',
            'https://v3.football.api-sports.io/fixtures?league=78&season=2022',
            'https://v3.football.api-sports.io/fixtures?league=45&season=2022',
            'https://v3.football.api-sports.io/fixtures?league=3&season=2022']
    key = '8761add519b3bd6803a73cceea02f369'
    headers = {
        "x-rapidapi-key": key
    }
    for link in links:
        response1 = requests.request("GET", link, headers=headers)
        quote1 = json.loads(response1.text)
        for i in quote1['response']:
            home, away = i['teams']['home']['name'], i['teams']['away']['name']
            if home not in all_teams:
                all_teams[home] = (home, i['teams']['home']['logo'])
            if away not in all_teams:
                all_teams[away] = (away, i['teams']['away']['logo'])
    return all_teams

