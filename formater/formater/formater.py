import json
import pandas

def loadCSV(path) -> any:
    data: pandas.DataFrame = pandas.read_csv(path)
    
