function getSumNumber(num) {
        var k = 1, tmp;
        while (num) {
            tmp = num % 10;
            num = (num - tmp) / 10;
            k *= tmp;
        }
        return sum;
    }
    alert(getSumNumber(5412));