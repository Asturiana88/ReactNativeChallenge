import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: { 
    screens: {
      LandingPage:'/',
      Root: {
        screens: {
          Characters: {
            screens: {
              CharactersScreen: 'characters',
            },
          },
          Episodes: {
            screens: {
              EpisodesScreen: 'episodes',
            },
          },
          Locations: {
            screens: {
              LocationsScreen: 'locations',
            },
          },
        },
      },
      NotFound: '*',

    },
  },
};
