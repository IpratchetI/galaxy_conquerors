export type TopicModel = {
	id: TopicId;
	name: string;
	comments: CommentModel[];
	length: number;
	users: Record<number, string>;
};

export type GetTopics = Pick<TopicModel, 'id' | 'name' | 'length'>[];

export type TopicId = string;

export type CommentModel = {
	id: string;
	userId: number;
	messages: IMessage[];
	reactions: Record<ReactionModel, number>;
};

export type ReactionModel = string;
export interface IMessage {
	id: string;
	text: string;
}

export type Topics = TopicModel[];
