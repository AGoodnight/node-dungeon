import pandas as pd
import json

from formatter import Formatter as f
from pandas import DataFrame


def main():
    schema = json.load(open('schemas/creature.schema.json'))

    monsters:DataFrame = pd.read_csv("data/monsters.csv")
    monster_types_table:DataFrame = pd.read_csv("data/monsters_dtypes.csv")
    
    formatter = f.Formatter()
    formatter.addSchema(schema)
    modelName = formatter.format(monsters,monster_types_table)
    formatter.export(modelName)

if __name__ == "__main__":
    main()
