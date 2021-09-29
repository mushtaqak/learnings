const list1 = [2,2,5,6,5,6,2,2,1];

let counter = 0;
let maxUsed = 0;
let items = {};
for (item of list1) {
    if (Object.keys(items).includes('' + item)){
        items[item] = ++items[item];
    } else {
        items[item] = 1;
    }
    if (items[item] > counter) {
        counter = items[item];
        maxUsed = item;
    }
}
console.log(`${maxUsed} is used ${counter} times`);
