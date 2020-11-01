import * as React from 'react';
import ContentHandler from '../components/ContentHandler';
import { LOCATIONS_QUERY } from "../utils/queries";

const EpisodesScreen = () => (
  <ContentHandler query={LOCATIONS_QUERY} dataAttib="locations" filter="" onSeletedTypeName="name" />
);


export default EpisodesScreen;