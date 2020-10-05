import * as React from 'react';
import ContentHandler from '../components/ContentHandler';
import { EPISODES_QUERY } from "../utils/queries";

export default function EpisodesScreen() {
  return (
    <ContentHandler query={EPISODES_QUERY} dataAttib="episodes" filter="" onSeletedTypeName="name" />
  );
}