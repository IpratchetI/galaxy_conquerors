import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { BelongsTo } from 'sequelize';

import type { CommentDto } from './types';
import User, { type UserDto } from '../../db-models/user';

import { Topic } from '../topic/model';

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, Partial<CommentDto>> {
	@Column(DataType.TEXT)
	declare content: string;

	@ForeignKey(() => Topic)
	@Column(DataType.INTEGER)
	declare topicId: number;

	// @ts-ignore
	@BelongsTo(() => User)
	declare author: UserDto;
}
