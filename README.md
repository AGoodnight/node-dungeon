# Node Dungeon
This is a new project to build a slimmer version of this project: ( https://github.com/AGoodnight/Kotlin-KTOR-ddgrid )

The original project demonstrated how we can have a kotlin graphql server drive a js frontend ( https://github.com/AGoodnight/ES6-ddgrid-frontend ). However GraphQL is not the ideal solution for a project of this size, further kotlin is also overkill because we do not use any Java libraries that can't be replaced.

So this project aims to redo that project with a lighter backend solution using Node.

## Data Cleanup and Database Initialization
This project will also include a custom 'cleanup' formater for csv data. Pandas will enable importing, reformating and replacing of the source csv/datatables. We will then export a new csv file that can then be imported via an sql script that will run COPY on various tables.
