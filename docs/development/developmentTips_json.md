## 原生js读取json文件内容

## 方式

使用fetch的方法

json文件

```json
[
  {
    "sku_id": 1747892190253625346,
    "name": "海盛郁金香(白)",
    "sku_name": "B级（10支）",
    "skuPic": "https://hua5-group.oss-cn-hangzhou.aliyuncs.com/upload/20240118/b3c6ac38b8fb903a4d6c3d7828c23c2a.jpg",
    "picO": "http://hua5oss.oss-cn-hangzhou.aliyuncs.com/admin_uploads/image/2021/09/15/a904ecc2.jpeg"
  },
  {
    "sku_id": 1749691008086884353,
    "name": "卷边非洲菊(北海道)",
    "sku_name": "A级（10支）",
    "skuPic": "https://hua5-group.oss-cn-hangzhou.aliyuncs.com/upload/20240123/2dbe56aa3d52e8da1a7f986cfcff8199.jpg",
    "picO": "http://hua5oss.oss-cn-hangzhou.aliyuncs.com/admin_uploads/image/2023/04/17/9f920d61.jpeg"
  },
  {
    "sku_id": 1747892190253625346,
    "name": "海盛郁金香(白)",
    "sku_name": "B级（10支）",
    "skuPic": "https://hua5-group.oss-cn-hangzhou.aliyuncs.com/upload/20240118/b3c6ac38b8fb903a4d6c3d7828c23c2a.jpg",
    "picO": "http://hua5oss.oss-cn-hangzhou.aliyuncs.com/admin_uploads/image/2021/09/15/a904ecc2.jpeg"
  },
  {
    "sku_id": 1749691008086884353,
    "name": "卷边非洲菊(北海道)",
    "sku_name": "A级（10支）",
    "skuPic": "https://hua5-group.oss-cn-hangzhou.aliyuncs.com/upload/20240123/2dbe56aa3d52e8da1a7f986cfcff8199.jpg",
    "picO": "http://hua5oss.oss-cn-hangzhou.aliyuncs.com/admin_uploads/image/2023/04/17/9f920d61.jpeg"
  },
  {
    "sku_id": 1747892190253625346,
    "name": "海盛郁金香(白)",
    "sku_name": "B级（10支）",
    "skuPic": "https://hua5-group.oss-cn-hangzhou.aliyuncs.com/upload/20240118/b3c6ac38b8fb903a4d6c3d7828c23c2a.jpg",
    "picO": "http://hua5oss.oss-cn-hangzhou.aliyuncs.com/admin_uploads/image/2021/09/15/a904ecc2.jpeg"
  },
  {
    "sku_id": 1749691008086884353,
    "name": "卷边非洲菊(北海道)",
    "sku_name": "A级（10支）",
    "skuPic": "https://hua5-group.oss-cn-hangzhou.aliyuncs.com/upload/20240123/2dbe56aa3d52e8da1a7f986cfcff8199.jpg",
    "picO": "http://hua5oss.oss-cn-hangzhou.aliyuncs.com/admin_uploads/image/2023/04/17/9f920d61.jpeg"
  }
]
```

html文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JSON 文件展示</title>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 20px;
  }
  .container {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    transition: background-color 0.3s;
  }
  .item:last-child {
    border-bottom: none;
  }
  .item:hover {
    background-color: #f9f9f9;
  }
  .item img {
    max-width: 120px;
    margin-right: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .item-details {
    flex: 1;
  }
  .item-details p {
    margin: 5px 0;
    color: #333;
  }
  .item-details p span {
    font-weight: bold;
  }
  @media (max-width: 600px) {
    .item img {
      max-width: 100%;
    }
    .item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
</head>
<body>
<div class="container" id="jsonDisplay">Loading...</div>

<script>
fetch('Result_48.json')
  .then(response => response.json())
  .then(jsonData => {
    const jsonDisplay = document.getElementById('jsonDisplay');
    jsonDisplay.innerHTML = ''; // 清空加载提示

    jsonData.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      
      const imgContainer = document.createElement('div');
      const textContainer = document.createElement('div');
      textContainer.className = 'item-details';
      
      const skuPic = document.createElement('img');
      skuPic.src = item.skuPic;
      skuPic.alt = item.name;
      imgContainer.appendChild(skuPic);
      
      const skuId = document.createElement('p');
      skuId.innerHTML = `<span>SKU ID:</span> ${item.sku_id}`;
      textContainer.appendChild(skuId);
      
      const name = document.createElement('p');
      name.innerHTML = `<span>Name:</span> ${item.name}`;
      textContainer.appendChild(name);
      
      const skuName = document.createElement('p');
      skuName.innerHTML = `<span>SKU Name:</span> ${item.sku_name}`;
      textContainer.appendChild(skuName);
      
      const picOTitle = document.createElement('p');
      picOTitle.innerHTML = `<span>Picture:</span> <img src="${item.picO}" alt="${item.name}" style="max-width: 40px; margin-top: 5px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">`;
      textContainer.appendChild(picOTitle);
      
      itemDiv.appendChild(imgContainer);
      itemDiv.appendChild(textContainer);
      
      jsonDisplay.appendChild(itemDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
    const jsonDisplay = document.getElementById('jsonDisplay');
    jsonDisplay.textContent = 'Error loading data.';
  });
</script>
</body>
</html>
```

效果图
![vue-7.png](..%2Fpublic%2Fimg%2Fvue-7.png)
