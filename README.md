# sfmoviemap

## Problem definition: 
To create a service that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search.

(Task source: https://github.com/uber-archive/coding-challenge-tools/blob/master/coding_challenge.md)

## Data source: 
A CSV file named Film Locations available for download on DataSF has been used. It contains fields including film title, year of release, lotions, production company, distributor, director, writer and main characters. 

The CSV file originally contains over 3000 entries. For demonstration purpose, the file has been sampled down to 440 entries. Data has also been cleaned for better presentation. For example, duplicate companies' names under different spelling have been grouped and put under the same names.  

In addition, the locations written in text in the original CSV file have been converted to the corresponding latitudes and longitudes using the geocoding service of the Google Maps API. These latitudes and longitudes are then added as separate columns to the CSV file. 

The CSV file containing cleaned and organised data is then uploaded to a cluster hosted on the MongoDB Atlas as the source of data. 

## Design and usage: 
The web application is written in Javascript. For the backend, a Node.js server has been set up under the express framework. The database service chosen for this project is MongoDB Atlas. Google Maps API is used as the mapping service. First, user inputs(i.e. keywords and field) are passed as parameters in requests from the client to the server to make query on the database. Search results from the database are returned as server responses. These responses are rendered on the Google map object on the frontend as markers. Finally, the application is hosted on heroku. 

The user interface includes a search bar with a lookup button, a text box, a field selection box and a Google Map instance. 

To use the application, users first input the relevant keywords and search field(i.e. criteria such as Title, Year of Release, etc) under the search bar. This will trigger a function to fetch matching data and show 10 matching entries. Either by the pressing enter key or by clicking on one of these keywords, relevant markers will be added to the map object. Info windows containing all the relevant film information will be shown when these markers are pressed. 

## Technical choices:

### Node.js 
Node.js(and express) is chosen because of its non-blocking and asynchronous nature, which is good for handling non-CPU intensive but tedious tasks such as fetching many entries from database. 

### MongoDB
MongoDB is chosen because it works well with Javascript and is quick in data retrieval. 

## Possible improvements: 

### Overlapping markers
One issue is that markers of the same position are on top of each other on the map, making some info windows unreachable. 3rd party modules such as Overlapping Marker Spiderfier(URL: https://github.com/jawj/OverlappingMarkerSpiderfier) can be used to solve this issue. 

### Webpage design
The current webpage has a responsive design. The stylesheet can be further improved to make the appearance more appealing. 

### Responsiveness of the application
The current app has a good responsiveness. However, it still takes several seconds for initialising the connection to the database when the app is first opened. This can be improved by upgrading the MongoDB atlas cluster the application uses, as it is currently using the free tier instance. 

### Testing
Different test methods should be used in addition to manual testing.

## Link to application: 
To test the application, simply go to https://sfmoviemap1.herokuapp.com/


## Credits: 
A Node module called csvgeocode(URL: https://github.com/veltman/csvgeocode) has been used to convert locations in text to latitude and longitude pairs. 
