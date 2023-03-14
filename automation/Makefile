
.SILENT: 
	clean
	setup
	run
clean:
	rm -rf __pycache__
	rm -rf venv
setup:
	python3 -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt
text:
	. venv/bin/activate
	python3 application.py
bball: 
	python3 basketball_data_collection.py
football:
	python3 football_data_collection.py
internationalsoccer:
	python3 international_soccer_data_collection.py
leaguesoccer:
	python3 league_soccer_data_collection.py
run: 
	make setup
	make text
datacollect:
	make internationalsoccer
	make bball
	make football
	make leaguesoccer


	
	