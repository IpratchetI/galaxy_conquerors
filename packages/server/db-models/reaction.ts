import {
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	Length,
	Model,
	PrimaryKey,
	Table,
	TableOptions
} from 'sequelize-typescript';

@Table({
	timestamps: false,
	tableName: 'reactions'
} as TableOptions)
export class Reaction extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id: number;

	@AllowNull(false)
	@Length({ min: 1, max: 1 })
	@Column(DataType.CHAR)
	reaction: string;

	@AllowNull(false)
	@Column(DataType.INTEGER)
	comment_id: number;
}
