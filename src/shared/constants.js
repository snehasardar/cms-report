export const REGEX_DIGITS = /^[0-9]+$/;
export const REGEX_FULL_NAME = /^[a-zA-Z'.]+( [a-zA-Z'.]+)*$/;
// export const REGEX_EMAIL = /^[a-zA-Z0-9!#$%&@'.]+( [a-zA-Z'.]+)*$/;

export const GENDERS_FORM = [
	{ label: 'Male', value: 'M' },
	{ label: 'Female', value: 'F' },
	{ label: 'Other', value: 'U' },
];

export const INITIAL_FORM = [
	{label: 'Mr', value: 'Mr'},
	{label: 'Mrs', value: 'Mrs'},
	{label: 'Miss', value: 'Miss'},
];

export const STATUS_FORM =[
	{label: 'Active', value: '1'},
	{label: 'Inactive', value: '0'},
]