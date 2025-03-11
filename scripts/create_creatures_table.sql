-- Creature Table Creation Statement (PostgreSQL)

CREATE TABLE Creatures (
    ID UUID PRIMARY KEY,
    Alive BOOLEAN NOT NULL,
    HitPoints INTEGER NOT NULL,
    Initiative INTEGER NOT NULL,
    X INTEGER NOT NULL,
    Y INTEGER NOT NULL,
    Category VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Example of how to add a trigger to update TimeModified automatically
-- if you don't want to rely solely on the application doing it.

CREATE OR REPLACE FUNCTION update_time_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.TimeModified = EXTRACT(EPOCH FROM now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_creatures_time_modified
BEFORE UPDATE ON Creatures
FOR EACH ROW
EXECUTE FUNCTION update_time_modified();

-- Example of how to add a trigger to update createdAt automatically
-- if you don't want to rely solely on the application doing it.

CREATE OR REPLACE FUNCTION set_time_created()
RETURNS TRIGGER AS $$
BEGIN
    NEW.createdAt = EXTRACT(EPOCH FROM now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_creatures_time_created
BEFORE INSERT ON Creatures
FOR EACH ROW
WHEN (NEW.createdAt IS NULL)
EXECUTE FUNCTION set_time_created();

-- Example of how to create an index on the Creature category.
CREATE INDEX idx_creatures_category ON Creatures(Category);

-- Example of how to create an index on the X and Y coordinates.
CREATE INDEX idx_creatures_coordinates ON Creatures(X,Y);

-- Example of how to create an index on the name.
CREATE INDEX idx_creatures_name ON Creatures(Name);