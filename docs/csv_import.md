# Bulk import CSV

Copied from here > https://hasura.io/docs/2.0/schema/postgres/postgres-guides/import-data-from-csv/


```zsh
brew install csvkit

for N in {Languages,Skills,Additional,Font,Senses,WRI} 
do csvcut -c ${N} monsters.csv | tail -n +2| awk '{print tolower($1)}'| tr '\n' ',' | awk '{gsub(/"/,"")}1' | awk '{ gsub(/\n +,+/, ",") }1' | awk 'BEGIN{RS=ORS=","} !seen[$0]++' | awk '{gsub(/,+/,",")}1'> ${N}.txt 
done;

# for N in {Languages,Skills,Additional,Font,Senses,WRI} 
# do ( echo "${N}"; in2csv -f csv ${N}.txt | csvformat -U 1) > ${N}.csv
# done;
```



## Import Data from CSV into Postgres
Introduction

You might have existing data stored in a CSV file that you need to import into your Postgres database. The following guide will show how to do so.

Let's assume we have the following CSV file, which is named profile.csv:
.csv data file
Step 1: Add a corresponding table to your PG database

Let us create a table to match the data structure in your CSV file.

```bash
profile (
  firstName TEXT,
  lastName TEXT,
  email VARCHAR
)
```

Step 2: Connect to your Postgres database

Connect to your Postgres database by using the psql command on the terminal:
```bash
psql postgres://<username>:<password>@<host>:<port>/<database>

# for example
psql postgres://postgres:postgres@localhost:5432/postgres
```
Step 3: Import the data from the CSV file

Once connected to the database, use the following command from inside psql to import the data:
```bash
\copy <table_name> from '</path/to/file/filename.csv>' delimiter ',' CSV HEADER;
# for example
\copy profile from '/Users/sarahlewis/documents/profile.csv' delimiter ',' CSV HEADER;
```

Your data would have been successfully copied into the Postgres database.
Values not explicitly provided in the CSV file

If a column's value is auto-generated, you can exclude it from the CSV file and allow the database to populate it automatically. However, you must make sure that the auto-generated column is defined as such in the table schema.

If a column is not present in the CSV file, you can call out the specific columns that you want to import from the CSV into the database. Imagine our CSV from earlier doesn't contain the email column. We can import the data from the CSV into the database by specifying only the columns we want to import:

```bash
# \copy <table_name> (<column1>, <column2>, ...) from '</path/to/file/filename.csv>' delimiter ',' CSV HEADER;

\copy profile (firstName, lastName) from '/Users/sarahlewis/documents/profile.csv' delimiter ',' CSV HEADER;
```
These columns' headers correspond to the appropriate column names in the table's schema.