#formatter.py

import pandas as pd
import python_jsonschema_objects as pjs
import numpy as np

class Formatter:
    
    def __init__(self,logger):
        self.output = {}
        self.logger = logger()
        
    def addSchema(self,schema):

        # NOTE: this will throw a warning that the schema version may not be recognized, 
        # this is fine for now, but in prod one may want to try a different schema version
        self.builder = pjs.ObjectBuilder(schema)
        schemaTitle = schema["title"]
        
        self.logger.info(f"Adding Schema '{schemaTitle}'")
        
        # add the schema
        self.schemaObjects = self.builder.build_classes()
        

    # Remove columns not in a schema
    def truncate(self,df,schemaKeys):
        self.logger.info("Truncating DataFrame based on Schema")

        # We will need to fill any columns that are not in the source dataframe with None, 
        # these columns can be populated via any database copy script ( why: separation of concerns )
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
        
        # Determine what type columns should contain, 
        column_types_i = []
        column_types_v = []
        column_types = {}

        self.logger.info(f"Cleaning DataTable")

        for t in types_table.columns:
            column_types_i.append(t.lower())

        for i,r in enumerate(types_table.iloc[0]):
            column_types_v.append(r)
            column_types[column_types_i[i]] = r

        for key, target_type in column_types.items():

            if target_type == "int" and key in schemaKeys:
                for i,value in df[key].items():
                    
                    # convert strings representing numeric values into integers
                    # replace other datatype values with NaN
                    try:
                        df.loc[i,key] = float(value)
                    except Exception as e:
                        df.loc[i,key] = np.nan
                
                # pandas can calculate the mean so long as we replaced non-numerics with NaN
                # fill NaN with a mean value
                column_mean = int(df[key].mean().round())
                df[key] = df[key].fillna(column_mean).astype(int)
        
        return df
    

    def format(self,df,types_table):
        schemaObject = self.schemaObjects.Creature()
        schemaKeys = list(schemaObject.keys())
        df.columns = df.columns.str.lower()

        # Name the model based on the schema's title/name
        modelName = type(schemaObject).__name__

        # New Dataframe to place selected data into
        ndf = self.output[modelName] = self.truncate(df,schemaKeys)
        ndf = self.cleanData(ndf,schemaKeys,types_table)
        self.logger.info(f"DataTable '{modelName}' Cleaned")

        # We will remove the id object, as it will be created by the database.
        ndf = ndf.drop("id",axis=1)
        
        return modelName

    def export(self,modelName):
        self.output[modelName].to_csv(f"data/csv/{modelName}.csv",index=False)
        self.logger.success(f"Exported {modelName}.csv!")