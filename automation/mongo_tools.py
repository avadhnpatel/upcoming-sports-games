import pymongo
from pymongo import MongoClient
from sports_api_collection import *
from time import time
import json
import datetime
from dotenv import load_dotenv

load_dotenv()
current_client_link = os.getenv('CLIENT_LINK')
def add_user(client_link, name, phone_number, carrier, favorite_teams):
    # Connect to the MongoDB server
    client = MongoClient(client_link)

    # Connect to the database
    db = client['upcoming_sports_games']

    # Connect to the users collection
    users = db['users']

    # Create the new user document
    new_user = {
        'name': name,
        'phone_number': phone_number,
        'carrier': carrier,
        'favorite_teams': favorite_teams
    }

    # Insert the new user document into the users collection
    users.insert_one(new_user)
    # Close the connection
    client.close()

# add_user(client_link, 'Ameya', '3319802891', 't-mobile', ['Chicago Bears', 'Chicago Bulls'])
# add_user(current_client_link, 'Avadh', '3312296253', 'T-Mobile', ['San Francisco 49ers', 'Golden State Warriors', 'Illinois', 'Arsenal'])

def add_new_games(client_link):
    client = MongoClient(client_link)
    # Connect to the database
    db = client['upcoming_sports_games']
    # Connect to a collection
    collection = db['games']

    all_games = []
    all_games += all_hockey()
    all_games += all_baseball()
    all_games += all_basketball()
    all_games += all_football()
    all_games += all_league_soccer()

    for i in all_games:
        new_document = i.turn_to_dic()
        existing_document = collection.find_one({'home_team':new_document['home_team'], 'away_team':new_document['away_team'], 'date_time_unix':new_document['date_time_unix']})
        # If the document does not already exist
        if not existing_document:
            # Insert the new document
            inserted_id = collection.insert_one(new_document).inserted_id
            print("Document inserted with id: ", inserted_id)
        else:
            print("Document already exists.")
    client.close()

def delete_old_games(client_link):
    client = MongoClient(client_link)
    # Connect to the database
    db = client['upcoming_sports_games']
    # Connect to a collection
    collection = db['games']
    current_timestamp = int(time())
    # Delete all documents with date_time_unix less than the current timestamp
    result = collection.delete_many({"date_time_unix": {"$lt": current_timestamp}})
    # Print the number of documents deleted
    print(result.deleted_count, "documents deleted.")
    # Close the connection
    client.close()

def delete_all_documents(client_link, collection):
    # Connect to the MongoDB server
    client = MongoClient(client_link)
    # Connect to the database
    db = client['upcoming_sports_games']
    # Connect to a collection
    c = db[collection]
    # Delete all documents in the collection
    result = c.delete_many({})
    # Print the number of documents deleted
    print(result.deleted_count, "documents deleted.")
    # Close the connection
    client.close()

def test():
    # Connect to the MongoDB server
    client = MongoClient(current_client_link)
    # Connect to the database
    db = client['upcoming_sports_games']
    # Connect to a collection
    collection = db['games']
    # Perform operations on the collection
    results = collection.find({'home_team': 'Illinois', 'away_team':'Rutgers'})
    # Iterate over the results and print the documents
    for result in results:
        print(result)
    client.close()

def get_all_users(client_link):
    # Connect to the MongoDB server
    client = MongoClient(client_link)
    # Connect to the database
    db = client['upcoming_sports_games']
    # Connect to the users collection
    users = db['users']
    # Retrieve all documents from the users collection
    all_users = users.find()
    ret = [i for i in all_users]
    client.close()
    return ret

def get_team_games(client_link, team, days):
    client = MongoClient(client_link)
    # Connect to the database
    db = client['upcoming_sports_games']
    # Connect to a collection
    collection = db['games']
    # convert the datetime object to a unix timestamp
    current_time_unix = datetime.datetime.now().timestamp()
    # time 5 days from now
    days_from_now_unix = current_time_unix + (days * 86400)
    query = {
        "$or": [
            {"home_team": team},
            {"away_team": team}
        ],
        "date_time_unix": {
            "$gte": current_time_unix,
            "$lte": days_from_now_unix
        }
    }
    # execute the query
    results = collection.find(query)
    # Iterate over the results and print the documents
    ret = list(results)
    client.close()
    return ret

def add_teams(client_link):
    # Connect to the MongoDB server
    client = MongoClient(client_link)

    # Connect to the database
    db = client['upcoming_sports_games']

    # Connect to the users collection
    teams = db['teams']
    all_teams = get_all_teams()
    for k,v in all_teams.items():
        existing_document = teams.find_one({'team_name':k})
        # If the document does not already exist
        if not existing_document:
            # Insert the new document
            new_team = {
                'team_name': k,
                'team_logo': v[1],
            }
            inserted_id = teams.insert_one(new_team).inserted_id
            # print(k, "inserted with id: ", inserted_id)
        # else:
            # print("Team already exists.")
    # Close the connection
    client.close()

def insert_teams_to_json(client_link):
    # Connect to the MongoDB server
    client = MongoClient(client_link)

    # Connect to the database
    db = client['upcoming_sports_games']

    # Connect to the users collection
    teams = db['teams']

    documents = teams.find({}, {'_id': False, 'team_logo': False})

    # Write the documents to a JSON file
    with open("teams.json", "w") as outfile:
        json.dump(list(documents), outfile)

def get_all_userteams(client_link):
    client = MongoClient(client_link)
    db = client['upcoming_sports_games']

    # Get the users collection and the userteams collection
    users = db['users']
    userteams = db['userteams']

    # Initialize an empty dictionary to store the results
    user_teams_dict = {}

    # Iterate through each user in the users collection
    for user in users.find():
        # Get the user's phone number
        phone_number = user['phone']
        carrier = user['carrier']
        
        # Find all userteams that have the current user's _id
        user_teams = userteams.find({'user_id': str(user['_id'])})
        
        # Extract the team names for the user and store them in a list
        team_names = [(team['teamName'], team['days']) for team in user_teams]
        
        # Add the phone number and team names to the dictionary
        user_teams_dict[(phone_number, carrier)] = team_names

    # Print the resulting dictionary
    return user_teams_dict


# insert_teams_to_json(current_client_link)
# delete_old_games(current_client_link)
# add_new_games(current_client_link)
#mongodb+srv://avadhpatel:0KDRWtTlcNJIVZWt@upcoming-sports-games.tjgitwv.mongodb.net/?retryWrites=true&w=majority

