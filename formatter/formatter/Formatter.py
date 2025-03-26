#formatter.py

import pandas as pd
import python_jsonschema_objects as pjs
import numpy as np

__all__ = ['Formatter']

class Formatter:
    
    def __init__(self):
        self.output = {}
        
    def addSchema(self,schema):
        self.schema = schema
        self.builder = pjs.ObjectBuilder(self.schema)
        self.schemaObjects = self.builder.build_classes()
        

    # Remove columns not in a schema
    def truncate(self,df,schemaKeys):

        # We will need to fill any columns that are not in the source dataframe with None
        fillWithNone = []
        ndf = pd.DataFrame()

        for key in schemaKeys:
            try:
                found = df[key]
                ndf[key] = found
            except Exception as e:
                fillWithNone.append(key)

        for key in fillWithNone:
            ndf[key] = None

        return ndf
    
    def cleanData(self,df,schemaKeys,types_table):
        # Determine what type to convert columns
        column_types_i = []
        column_types_v = []
        column_types = {}

        for t in types_table.columns:
            column_types_i.append(t.lower())

        for i,r in enumerate(types_table.iloc[0]):
            column_types_v.append(r)
            column_types[column_types_i[i]] = r

        for key, target_type in column_types.items():

            if target_type == "int" and key in schemaKeys:
                for i,value in df[key].items():
                    # print(i,value,key)
                    
                    try:
                        df.loc[i,key] = float(value)
                    except Exception as e:
                        df.loc[i,key] = np.nan
                
                # print(ndf[key])
                column_mean = int(df[key].mean().round())
                df[key] = df[key].fillna(column_mean).astype(int)
        
        return df
    

    def format(self,df,types_table):
        schemaObject = self.schemaObjects.Creature()
        schemaKeys = list(schemaObject.keys())
        df.columns = df.columns.str.lower()

        modelName = type(schemaObject).__name__
        # New Dataframe to place selected data into
        ndf = self.output[modelName] = self.truncate(df,schemaKeys)
        ndf = self.cleanData(ndf,schemaKeys,types_table)

        print(ndf.head(30))

        return modelName

    def export(self,modelName):
        self.output[modelName].to_csv(f"data/csv/{modelName}.csv",index=False)