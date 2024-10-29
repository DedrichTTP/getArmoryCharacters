const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function getCharacterProfile(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let characterProfileData;
    let characterName = '';
    let realmName = '';
    let regionName = '';
    let raceName = '';
    let genderName = '';

    $('script').each((i, el) => {
      const scriptContent = $(el).html();
      if (scriptContent.includes('characterProfileInitialState')) {
        const jsonString = scriptContent.match(/characterProfileInitialState\s*=\s*({.*?});/);
        
        if (jsonString && jsonString[1]) {
          characterProfileData = JSON.parse(jsonString[1]);

          // Extracting necessary properties
          characterName = characterProfileData.character?.name || 'character';
          realmName = characterProfileData.character?.realm?.name || 'realm';
          regionName = characterProfileData.character?.region || 'region';
          raceName = characterProfileData.character?.race?.name || 'race';
          genderName = characterProfileData.character?.gender?.name || 'gender';
        }
      }
    });

    if (characterProfileData) {
      const dirPath = path.join(__dirname, 'Characters', raceName, genderName);
      fs.mkdirSync(dirPath, { recursive: true });

      const fileName = `${characterName}-${realmName}-${regionName}.json`;
      const filePath = path.join(dirPath, fileName);

      fs.writeFileSync(filePath, JSON.stringify(characterProfileData, null, 2));
      console.log(`Character profile saved to ${filePath}`);
    } else {
      throw new Error('characterProfileInitialState not found');
    }
  } catch (error) {
    console.error('Error fetching the character profile:', error);
    throw error;
  }
}

// Get the URL from command line arguments
const url = process.argv[2];
if (!url) {
  console.error('Please provide a URL as a command line argument.');
  process.exit(1);
}

getCharacterProfile(url)
  .catch(error => {
    console.error('Error:', error);
  });