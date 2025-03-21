CREATE TABLE creature (
    ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    alignment VARCHAR(255) NOT NULL,
    hp INTEGER NOT NULL,
    createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -- SKILLS
CREATE TABLE creature_skill (
    ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    skill VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE creature_with_skills (
    ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    creature uuid NOT NULL,
    skill uuid NOT NULL,
    CONSTRAINT fk_creature_skill FOREIGN KEY (skill) REFERENCES creature_skill(ID)
);

-- SIZES
CREATE TABLE creature_size (
    ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    size VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE creature_with_sizes (
    ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    creature uuid NOT NULL,
    size uuid NOT NULL,
    CONSTRAINT fk_creature_size FOREIGN KEY (size) REFERENCES creature_size(ID)
);

-- TYPES
CREATE TABLE creature_type (
    ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE creature_with_types (
    ID uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    creature uuid NOT NULL,
    type uuid NOT NULL,
    CONSTRAINT fk_creature_type FOREIGN KEY (type) REFERENCES creature_type(ID)
);