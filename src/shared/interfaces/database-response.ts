interface IDatabaseError {
	code: string;
	errno?: number;
	index?: number;
	message?: string;
	name?: string;
	parameters?: string[];
	query?: string;
	sql?: string;
	sqlMessage?: string;
	sqlState?: number;
}

export type DatabaseError = Readonly<IDatabaseError>;
