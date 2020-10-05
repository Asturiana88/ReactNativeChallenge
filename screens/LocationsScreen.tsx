import * as React from 'react';
import ContentHandler from '../components/ContentHandler';
import { LOCATIONS_QUERY } from "../utils/queries";

export default function EpisodesScreen() {
  return (
    <ContentHandler query={LOCATIONS_QUERY} dataAttib="locations" filter="" onSeletedTypeName="name" />
  );
}