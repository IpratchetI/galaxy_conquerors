import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';

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

	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	declare userId: number;

	// TODO: https://linear.app/galaxyconquerors/issue/GAL-60/dorabotki-po-api-foruma
	@BelongsTo(() => User)
	declare author: UserDto;
}
