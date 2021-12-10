import pandas as pd
import geopy.geocoders
from geopy.exc import GeocoderTimedOut
from geopy.geocoders import Nominatim
import json,sys

names = json.loads(sys.argv[1])
data = {'City':names}
df = pd.DataFrame(data)

longitude = []
latitude = []

def findGeocode(city):
    try:
        geopy.geocoders.options.default_user_agent = 'Test'
        geopy.geocoders.options.default_timeout = 7
        geolocator = Nominatim()
        return geolocator.geocode(city)

    except GeocoderTimedOut:  
        return findGeocode(city)
         
for i in (df['City']): 
    if findGeocode(i) != None:    
        loc = findGeocode(i)
        latitude.append(loc.latitude)
        longitude.append(loc.longitude)
    else:
        latitude.append('0.000 E')
        longitude.append('0.000 N')

df["Longitude"] = longitude
df["Latitude"] = latitude

print(df)

 