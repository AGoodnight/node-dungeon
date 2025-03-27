import pandas as pd
import json

from formatter import formatter as f
from logger import logger as l
from pandas import DataFrame

# Turn off some warnings
pd.set_option('future.no_silent_downcasting', True)

# Main process
def main():
    schema = json.load(open('schemas/creature.schema.json'))

    monsters:DataFrame = pd.read_csv("data/monsters.csv")
    monster_types_table:DataFrame = pd.read_csv("data/monsters_dtypes.csv")
    
    formatter = f.Formatter(l.Logger)
    formatter.addSchema(schema)
    modelName = formatter.format(monsters,monster_types_table)
    formatter.export(modelName)

if __name__ == "__main__":
    main()
