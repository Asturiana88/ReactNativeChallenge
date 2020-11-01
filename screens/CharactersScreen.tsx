import * as React from 'react';
import ContentHandler from '../components/ContentHandler';
import { CHARACTERS_QUERY } from "../utils/queries";

const CharactersScreen = () => (
  <ContentHandler query={CHARACTERS_QUERY} dataAttib="characters" filter="" onSeletedTypeName="name" />
);

export default CharactersScreen;