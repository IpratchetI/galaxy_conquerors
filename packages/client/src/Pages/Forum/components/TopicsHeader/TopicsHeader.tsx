type TopicsHeaderProps = {
	className: string;
};

export const TopicsHeader = ({ className }: TopicsHeaderProps) => {
	return (
		<div className={className}>
			<span>Themes:</span>
			<span>Comments:</span>
		</div>
	);
};
