import type { Topic, TopicId } from '../../model/types'
import {
  appsTopic,
  cartoonsTopic,
  footballersTopic,
  moviesTopic,
  professionsTopic,
  sportsTopic,
} from './culture'
import { clothesTopic, foodTopic, fruitsTopic, homeTopic, techTopic } from './everyday'
import {
  animalsTopic,
  countriesTopic,
  natureTopic,
  placesTopic,
  transportTopic,
} from './world'

/** Barcha mavzular — sozlamalar sahifasida shu tartibda koʻrinadi. */
export const TOPICS: readonly Topic[] = [
  homeTopic,
  natureTopic,
  animalsTopic,
  cartoonsTopic,
  moviesTopic,
  foodTopic,
  fruitsTopic,
  professionsTopic,
  sportsTopic,
  transportTopic,
  placesTopic,
  countriesTopic,
  clothesTopic,
  techTopic,
  footballersTopic,
  appsTopic,
]

export const TOPIC_IDS: readonly TopicId[] = TOPICS.map((topic) => topic.id)

const topicsById = new Map<string, Topic>(TOPICS.map((topic) => [topic.id, topic]))

export function getTopicById(id: string): Topic | undefined {
  return topicsById.get(id)
}

export function isTopicId(id: string): id is TopicId {
  return topicsById.has(id)
}
