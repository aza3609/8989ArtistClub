document.addEventListener('DOMContentLoaded', () => {
    const sheetId = '1_8cnbn5tTfFDJwWIIXgscWO_UjqLh_2mjdZIvB51AwY'; // Google Sheets ID
    const apiKey = 'AIzaSyCpuSDYNhxT4134m51GfNvQ3ULd4eLpH-M'; // Google API Key
    const range = 'store!A2:D'; // 데이터 범위

    const storeGoods = document.getElementById('store-goods--main');

    let goodsData = [];

    // Google Sheets API를 통해 굿즈 정보를 가져오기
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            goodsData = data.values;
            displayGoods(goodsData);
        })
        .catch(error => console.error('Error:', error));

    // 굿즈 목록을 표시하는 함수
    function displayGoods(goodsList) {
        storeGoods.innerHTML = ''; // 기존 내용을 초기화

        goodsList.forEach(row => {
            const goodsDiv = document.createElement('a');
            goodsDiv.target = '_blank';
            goodsDiv.className = 'goods';
            goodsDiv.href = row[3];

            const goodImg = document.createElement('img');
            goodImg.src = [`src/goods/${row[0]}`];
            goodImg.alt = `${row[2]} 상품 사진`;



            goodsDiv.appendChild(goodImg);

            storeGoods.appendChild(goodsDiv);

            goodImg.addEventListener('mouseover', function() {
                goodImg.src = [`src/goods/${row[1]}`];
            });

            goodImg.addEventListener('mouseleave', function() {
                goodImg.src = [`src/goods/${row[0]}`];
            });
        });
    }
});


const storeGoodsMain = document.getElementById('store-goods--main');

document.getElementById('store-slide-left').addEventListener('click', () => {
    storeGoodsMain.scrollLeft -= storeGoodsMain.scrollWidth * 0.3; // 왼쪽으로 20% 이동
});

document.getElementById('store-slide-right').addEventListener('click', () => {
    storeGoodsMain.scrollLeft += storeGoodsMain.scrollWidth * 0.3; // 오른쪽으로 20% 이동
});
