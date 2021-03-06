// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
	id: number;
	name: string;
};

export type Meta = {
	oldest_id: string;
	newest_id: string;
	result_count: number;
	next_token: string;
};
