function sum(a, b) {
    return a + b;
}

let undefinedFilter = (data) => {
    if (data == undefined) {
        let emptyString = '<br>';
        return emptyString;
    } else {
        return data;
    };
};


test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('adds 5 + 6 to equal 11', () => {
    expect(sum(5, 6)).toBe(11);
});

test('gives undefined to return <br>', () => {
    expect(undefinedFilter(undefined)).toBe('<br>');
});