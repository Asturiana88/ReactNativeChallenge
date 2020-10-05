import * as React from 'react';
import ContentHandler from '../components/ContentHandler';
import { CHARACTERS_QUERY } from "../utils/queries";

export default function CharactersScreen() {
  return (
      <ContentHandler query={CHARACTERS_QUERY} dataAttib="characters" filter="" onSeletedTypeName="name" />
  );
}
