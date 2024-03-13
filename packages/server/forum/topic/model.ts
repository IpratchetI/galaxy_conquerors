import { Column, DataType, DefaultScope, Model, Table } from 'sequelize-typescript';
import { HasMany, literal } from 'sequelize';

import type { TopicDto } from './types';

import { Comment } from '../comment/model';
import User from '../../db-models/user';

@DefaultScope(() => ({
	include: [User.scope('author')],
	attributes: {
		include: [
			[
				literal(
					'(SELECT COUNT(*) FROM "comments" as "Comment" WHERE "Comment"."topicId" = "Topic"."id")'
				),
				'commentsId'
			]
		]
	}
}))
@Table({ tableName: 'topics' })
export class Topic extends Model<Topic, Partial<TopicDto>> {
	@Column(DataType.STRING)
	declare title: string;

	@Column(DataType.TEXT)
	declare body: string;

	// @ts-ignore
	@HasMany(() => Comment)
	declare comments: Comment[];
}
