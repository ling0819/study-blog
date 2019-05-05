编写一个函数，它接受一个或多个单词的字符串，并返回相同的字符串，但所有五个或更多字母单词都反转（就像这个Kata的名字一样）。传入的字符串只包含字母和空格。仅当存在多个单词时才会包含空格。


例子：

spinWords( "Hey fellow warriors" )=>返回“Hey wollef sroirraw” 
spinWords( "This is a test")=>返回“This is a test” 
spinWords( "This is another test" )=>返回“This is rehtona test”


分析：这道题拿到之后，立马就能发现一个规律，多个单词的时候会有空格，这个是关键 空格将成为分隔符，来对每一段进行验证, 使用数组的反转操作

```
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
```