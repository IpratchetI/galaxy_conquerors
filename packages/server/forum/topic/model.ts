import { Column, DataType, DefaultScope, Model, Table, HasMany } from 'sequelize-typescript';
import { literal } from 'sequelize';

import type { TopicDto } from './types';

import { Comment } from '../comment/model';

@DefaultScope(() => ({
	attributes: {
		include: [
			[
				literal(
					'(SELECT COUNT(*) FROM "comments" as "Comment" WHERE "Comment"."topicId" = "Topic"."id")'
				),
				'commentsCount'
			]
		]
	}
}))
@Table({ tableName: 'topics' })
export class Topic extends Model<Topic, Partial<TopicDto>> {
	@Column(DataType.STRING)
	declare title: string;

	@HasMany(() => Comment)
	declare comments: Comment[];
}
