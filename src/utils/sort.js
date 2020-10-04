export const sortByInteger = ({ ascending, id }) => (a, b) => {
	return ascending
  ? +a[id] < +b[id] ? 1 : -1
  : +a[id] > +b[id] ? 1 : -1
}

export const sortByString = ({ ascending, id }) => (a, b) => {
	return ascending
	? a[id] < b[id] ? 1 : -1
  : a[id] > b[id] ? 1 : -1
}