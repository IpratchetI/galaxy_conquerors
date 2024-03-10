export type TopicModel = {
	id: ForumChildrenId;
	name: string;
	comments: CommentModel[];
	length: number;
	users: Record<number, string>;
};

export type GetTopics = Pick<TopicModel, 'id' | 'name' | 'length'>[];

export type ForumChildrenId = string;

export type CommentModel = {
	id: ForumChildrenId;
	userId: number;
	messages: IMessage[];
};

export type ReactionModel = string;
export interface IMessage {
	id: ForumChildrenId;
	text: string;
	reactions?: Record<ReactionModel, number>;
}

export type Topics = TopicModel[];
