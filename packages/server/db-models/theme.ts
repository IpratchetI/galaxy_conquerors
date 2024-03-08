import {
	AutoIncrement,
	Column,
	DataType,
	Index,
	Model,
	PrimaryKey,
	Table,
	TableOptions,
	Unique
} from 'sequelize-typescript';

@Table({
	timestamps: false,
	paranoid: true,
	tableName: 'theme'
} as TableOptions)
class Theme extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id: number;

	@Index
	@Unique
	@Column(DataType.TEXT)
	theme: string;
}

export default Theme;
