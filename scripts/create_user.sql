-- Create a new user (role)
CREATE ROLE superuser WITH LOGIN PASSWORD '12345';

-- Grant all privileges on all databases
GRANT ALL PRIVILEGES ON DATABASE postgres TO superuser; -- Replace 'postgres' with the actual database name if needed.

-- Grant all privileges on all tables in all schemas
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO superuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO superuser;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO superuser;

-- Grant all privileges on all schemas
GRANT ALL PRIVILEGES ON ALL SCHEMAS IN DATABASE postgres TO superuser;

-- Grant role creation privileges (be careful with this!)
ALTER ROLE superuser WITH CREATEROLE;

-- Grant database creation privileges (be careful with this!)
ALTER ROLE superuser WITH CREATEDB;

-- Grant replication privileges (be careful with this!)
ALTER ROLE superuser WITH REPLICATION;

-- Grant superuser privileges (extremely dangerous!)
ALTER ROLE superuser WITH SUPERUSER;