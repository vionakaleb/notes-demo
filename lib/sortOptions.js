const alphabeticSort = (note1, note2) =>
    note1.name.toLowerCase() < note2.name.toLowerCase() ? -1 : 1;

const createdSort = (note1, note2) =>
    note1.createdAt < note2.createdAt ? -1 : 1;

export const sortOptions = {
    TITLE_A_Z: "title-a-z",
    TITLE_Z_A: "title-z-a",
    CREATED_ASC: "created-asc",
    CREATED_DESC: "created-desc"
};

export const sortFuncs = {
    "title-a-z": alphabeticSort,
    "title-z-a": (n1, n2) => alphabeticSort(n2, n1),
    "created-asc": createdSort,
    "created-desc": (n1, n2) => createdSort(n2, n1)
};
