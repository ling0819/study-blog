function spinWords(words) {
    let arr = words.split(' ');
    arr = arr.map(item => {
        if (item.length >= 5) {
            return item.split('').reverse().join('');
        }
        return item;
    })
    if (arr.length > 1) {
        return arr.join(' ');
    }

    return arr.join();
}

console.log(spinWords("This is a test"))