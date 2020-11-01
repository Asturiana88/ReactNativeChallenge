import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
query($name:String, $page:Int, $type:String ){
  characters(filter:{name:$name, type:$type}, page:$page){
    info{
        	count
        pages
        next
        prev
      }
    results{
      id
      name
      type
      gender
      species
      image
    }
  }
}
`

export const LOCATIONS_QUERY = gql`
query($name:String, $page:Int){
  locations(filter:{name:$name}, page:$page){
    info{
      count
      pages
      next
      prev
    }
    results{
      name
      type
      dimension
      residents{name, image}
    }
  }
}
`

export const EPISODES_QUERY = gql`
query($name:String, $page:Int){
  episodes(filter:{name:$name}, page:$page){
    info{
      count
      pages
      next
      prev
    }
    results{
      id
      name
      air_date
      episode
      characters{name, image}
    }
  }
}
`