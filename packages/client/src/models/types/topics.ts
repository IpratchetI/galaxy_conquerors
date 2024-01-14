export interface ITopic {
	id: number;
	name: string;
	comments: number;
}

export interface IComment {
	id: number;
	userId: number; // for current step is simple
	messages: IMessage[];
}

export interface IMessage {
	id: number;
	text: string;
}

export type Topics = ITopic[];
