import { ITopic } from '../../../models/types/topics';

export const TOPICS_PATH = (topicId: ITopic['id']) => `/forum/${topicId}`;
