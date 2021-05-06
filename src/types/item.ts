type Item = {
	id: string;
	name: string;
	categoryId: string;
	active: boolean;
	done: boolean;
	quantity: number;
	comment: string | undefined;
};

export default Item;
