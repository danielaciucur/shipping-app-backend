CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT uuid_generate_v4();
CREATE TABLE parcels (
    uuid uuid DEFAULT uuid_generate_v4 (),
    parcelSKU VARCHAR NOT NULL,
    description VARCHAR(255),
    address VARCHAR(255),
    town VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    deliveryDate timestamp default NULL
    PRIMARY KEY (uuid)
);

INSERT INTO parcels (
    parcelSKU,
    description,
    address,
    town,
    state,
    country,
    deliveryDate
)
VALUES
    (
        'AAAAAAB',
        'pupet',
        'Teststreet 1',
        'Aasmae',
        'Harju',
        'Estonia',
        '2022-01-20'
    ),
    (
        'AAAAAC',
        'car toy',
        'Teststreet 2',
        'Kaina',
        'Hiiu',
        'Estonia',
        '2022-01-20'
    ),
    (
        'AAAAAAF',
        'helicopter toy',
        'Teststreet 3',
        'Albu'
        'Jarva',
        'Estonia',
        '2022-01-20'
    );
    (
        'AAAAABF',
        'keyboard',
        'Teststreet 4',
        'Alba Iulia'
        'Alba',
        'Romania',
        '2022-01-20'
        );
        (
            'AAAAAABC',
            'mouse',
            'Teststreet 5',
            'Cluj Napoca'
            'Cluj',
            'Romania',
            '2022-01-20'
            );
     (
            'AAAFAABC',
            'computer',
            'Teststreet 6',
            'Costinesti'
            'Constanta',
            'Romania',
            '2022-01-20'
);
(
         'AFAAAABC',
         'computer',
         'Teststreet 7',
         'Bad Gastein'
         'Salzburg',
         'Austria',
         '2022-01-20'
);
(
         'BAAAAABC',
         'computer',
         'Teststreet 8',
         'Wien'
         'Wien',
         'Austria',
         '2022-01-20'
);
(
         'CAAAAABC',
         'computer',
         'Teststreet 9',
         'Capolona'
         'Arezzo',
         'Italy',
         '2022-01-20'
);
(
         'DAAAAABC',
         'computer',
         'Teststreet 10',
         'Rovinj'
         'Istra',
         'Croatia',
         '2022-01-20'
);
(
        'DFVAAAAAB',
        'pupet',
        'Teststreet 11',
        'Karlstein',
        'Bavaria',
        'Germany',
        '2022-01-20'
    ),
