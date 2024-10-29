# Get Armory Characters

  

A script to scrape and organize World of Warcraft Armory character data.

  

## Features

  

- Fetch character data from the World of Warcraft Armory.

- Extract details such as name, realm, region, race, and gender.

- Save data as JSON files organized by race and gender.

  

## Installation

  

1. Clone the repository.

2. Navigate to the project directory.

3. Install dependencies:

  

```bash

npm install

```

  

## Usage

  

Run the script with a World of Warcraft Armory URL:

  

```bash

node  getCharacter.js <armory-url>

```

  

Replace `<armory-url>` with the actual URL of the character's profile.

  

## Example

  

```bash

node  getCharacter.js  https://worldofwarcraft.blizzard.com/en-gb/character/eu/argent-dawn/R%C3%A9ginleif

```

  

## Dependencies

  

- [axios](https://www.npmjs.com/package/axios)

- [cheerio](https://www.npmjs.com/package/cheerio)

  

## Author

  

Dedrich