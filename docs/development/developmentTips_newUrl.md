## new Url使用技巧

传统上，我们常使用字符串拼接或模板语法来构建URL。例如：

```js
const baseUrl = "https://api.example.com";
const userId = 12345;
const endpoint = baseUrl + "/users/" + userId + "/details";
console.log(endpoint); // "https://api.example.com/users/12345/details"
```

```js
import { TYPE_EDIT } from '@/constants/type.ts'
const type = TYPE_EDIT
const url = 'https://api.example.com/userInfo'
const newUrl = url + '?type=' + type + '&model=1&share=1&fromModule=wechat'
console.log(urlUrl) // https://api.example.com/userInfo?type=TYPE_EDIT&model=1&share=1&fromModule=wechat
```

或使用ES6模板字符串：

```js
const baseUrl = "https://api.example.com";
const userId = 12345;
const endpoint = `${baseUrl}/users/${userId}/details`;
console.log(endpoint); // "https://api.example.com/users/12345/details"
```

```js
import { TYPE_EDIT } from '@/constants/type.ts'
const type = TYPE_EDIT
const url = 'https://api.example.com/userInfo'
const newUrl = url + `?type=${type}&model=1&share=1&fromModule=wechat`
console.log(urlUrl) // https://api.example.com/userInfo?type=TYPE_EDIT&model=1&share=1&fromModule=wechat
```

虽然模板字符串在一定程度上提高了可读性，但这种方法仍存在几个问题：

1. **易读性差**：当URL变得复杂时，拼接和模板字符串会变得难以阅读和维护（现阶段已经难以阅读和维护了）。
2. **错误处理麻烦**：拼接过程中如果有任何错误（例如漏掉斜杠），可能会导致难以排查的BUG。
3. **缺乏类型安全**：拼接字符串无法提供编译时的类型检查，容易引入错误。

## 使用URL构造器

为了解决这些问题，现代JavaScript引入了URL构造器，可以更优雅和安全地处理URL。URL构造器提供了一种更结构化和直观的方法来构建和操作URL。

基本用法

```js
const baseUrl = "https://api.example.com";
const userId = 12345;
const url = new URL(`/users/${userId}/details`, baseUrl);
console.log(url.href); // "https://api.example.com/users/12345/details"
```

## 添加查询参数

```js
const baseUrl = "https://api.example.com";
const userId = 12345;

const url = new URL(`/users/${userId}/details`, baseUrl);
url.searchParams.append('type', 'EDIT');
url.searchParams.append('module', 'wechat');
console.log(url.href); // "https://api.example.com/users/12345/details?type=EDIT&module=wechat"
```

## 拼接数组参数

```js
const baseUrl = 'https://example.com';
const url = new URL(baseUrl);

const arrayParam = ['value1', 'value2', 'value3'];
// 将数组转换为逗号分隔的字符串
url.searchParams.set('array', arrayParam.join(','));

console.log(url.toString()); // https://example.com/?array=value1,value2,value3
```

## 解析数组参数

当我们获取URL并需要解析其中的数组参数时，可以使用`URLSearchParams`对象进行解析。

```js
const urlString = 'https://example.com/?array=value1,value2,value3';
const url = new URL(urlString);

const arrayParamString = url.searchParams.get('array');
// 将逗号分隔的字符串转换回数组
const arrayParam = arrayParamString ? arrayParamString.split(',') : [];

console.log(arrayParam); // ['value1', 'value2', 'value3']
```

以下是一个完整示例，包括拼接和解析数组参数的操作：

```js
// 拼接数组参数到URL
const baseUrl = 'https://example.com';
const url = new URL(baseUrl);

const arrayParam = ['value1', 'value2', 'value3'];
url.searchParams.set('array', arrayParam.join(','));

console.log(url.toString()); // https://example.com/?array=value1,value2,value3

// 解析数组参数从URL
const urlString = url.toString();
const parsedUrl = new URL(urlString);

const arrayParamString = parsedUrl.searchParams.get('array');
const parsedArrayParam = arrayParamString ? arrayParamString.split(',') : [];

console.log(parsedArrayParam); // ['value1', 'value2', 'value3']
```

## 处理多个同名参数

有时我们可能会遇到需要处理多个同名参数的情况，例如`?array=value1&array=value2&array=value3`。可以使用`URLSearchParams`的`getAll`方法：

```js
// 拼接多个同名参数到URL
const url = new URL(baseUrl);

const arrayParam = ['value1', 'value2', 'value3'];
arrayParam.forEach(value => url.searchParams.append('array', value));

console.log(url.toString()); // https://example.com/?array=value1&array=value2&array=value3

// 解析多个同名参数从URL
const urlString = url.toString();
const parsedUrl = new URL(urlString);

const parsedArrayParam = parsedUrl.searchParams.getAll('array');

console.log(parsedArrayParam); // ['value1', 'value2', 'value3']
```

通过这些方法，可以更加优雅和简便地处理URL中的数组参数，提升代码的可读性和可维护性。

但实际情况往往比上面的示例更复杂，比如参数是一个对象、根据实际情况来设置参数的值、要处理`undefined`、`'undefined'`、`0`、`'0'`、`Boolean`、`'true'`、`NaN`等不同类型和异常的值，每次使用时都去处理显然是不合理的，这时候就可以将拼接和移除参数的函数封装成方法来使用。

```js
/**
 * 获取URL查询参数并返回一个对象，支持数组
 * @param {string} urlString - 需要解析的URL字符串
 * @returns {Object} - 包含查询参数的对象
 */
function getURLParams(urlString) {
    const url = new URL(urlString);
    const params = new URLSearchParams(url.search);
    const result = {};

    for (const [key, value] of params.entries()) {
        if (result[key]) {
            if (Array.isArray(result[key])) {
                result[key].push(value);
            } else {
                result[key] = [result[key], value];
            }
        } else {
            result[key] = value;
        }
    }

    return result;
}

/**
 * 设置URL的查询参数，支持对象和数组
 * @param {string} urlString - 基础URL字符串
 * @param {Object} params - 需要设置的查询参数对象
 * @returns {string} - 带有查询参数的URL字符串
 */
function setURLParams(urlString, params) {
    const url = new URL(urlString);
    const searchParams = new URLSearchParams();

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            if (Array.isArray(value)) {
                value.forEach(val => {
                    if (val !== undefined && !Number.isNaN(val)) {
                        searchParams.append(key, val);
                    } else {
                        console.warn(`Warning: The value of "${key}" is ${val}, which is invalid and will be ignored.`);
                    }
                });
            } else if (value !== undefined && !Number.isNaN(value)) {
                searchParams.append(key, value);
            } else {
                console.warn(`Warning: The value of "${key}" is ${value}, which is invalid and will be ignored.`);
            }
        }
    }

    url.search = searchParams.toString();
    return url.toString();
}

// 测试用例
const baseUrl = 'https://example.com';

// 测试 getURLParams 方法
const testUrl = 'https://example.com/?param1=value1&param2=value2&param2=value3';
const parsedParams = getURLParams(testUrl);
console.log(parsedParams); // { param1: 'value1', param2: ['value2', 'value3'] }

// 测试 setURLParams 方法
const params = {
    param1: 'value1',
    param2: ['value2', 'value3'],
    param3: undefined,
    param4: NaN,
    param5: 'value5',
    param6: 0,
};

const newUrl = setURLParams(baseUrl, params);
console.log(newUrl); // 'https://example.com/?param1=value1&param2=value2&param2=value3&param5=value5'
```

以上代码是根据掌握的知识编写的基本使用示例，像这种工作完全不用自己来写，现在已经有非常成熟的库可以直接使用。

## qs

npmjs [www.npmjs.com/package/qs](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fqs)