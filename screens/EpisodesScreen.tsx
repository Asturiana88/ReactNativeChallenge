import * as React from 'react';
import ContentHandler from '../components/ContentHandler/ContentHandler';
import { EPISODES_QUERY } from "../utils/queries";

const EpisodesScreen = () => (
  <ContentHandler query={EPISODES_QUERY} dataAttib="episodes" filter="" onSeletedTypeName="name" />
);

export default EpisodesScreen;