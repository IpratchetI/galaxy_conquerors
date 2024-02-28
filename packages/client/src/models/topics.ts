export type TopicModel = {
	id: number;
	name: string;
	comments: CommentModel[];
	length: number;
};

export type CommentModel = {
	id: number;
	userId: number; // for current step is simple
	messages: IMessage[];
};

export interface IMessage {
	id: number;
	text: string;
}

export type Topics = TopicModel[];
