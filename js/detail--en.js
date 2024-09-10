const sheetId = '1_8cnbn5tTfFDJwWIIXgscWO_UjqLh_2mjdZIvB51AwY'; // Google Sheets ID
const apiKey = 'AIzaSyCpuSDYNhxT4134m51GfNvQ3ULd4eLpH-M'; // Google API Key
const range = 'exhibition-en!A2:K'; // 데이터 범위

// URL에서 전시 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const exhibitionId = urlParams.get('id');

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const DetailColumn1 = document.getElementById('detail-column-1');

        // 전시 ID는 1부터 시작한다고 가정
        const exhibitionIndex = parseInt(exhibitionId) - 1; // 문자열일 경우 숫자로 변환 후 1을 뺌
        // 해당 순번에 맞는 데이터를 가져옴
        const row = data.values[exhibitionIndex];

        if (row) {
            // 포스터 이미지 추가
            const poster = document.createElement('img');
            poster.src = `src/exhibitions/${row[0]}`;
            DetailColumn1.appendChild(poster);

            // 이미지 링크들이 콤마로 구분된 경우
            const imageLinks = row[10].split(','); // row[0]에 이미지 링크가 있다고 가정
  
            imageLinks.forEach(link => {
            const poster = document.createElement('img');
            poster.src = `src/exhibitions/${link.trim()}`; // 링크 앞뒤의 공백 제거
            DetailColumn1.appendChild(poster);
            });

            // 전시 제목 설정
            const title = document.querySelector('#detail h1');
            title.textContent = row[1];

            // 날짜 설정
            const date = document.querySelector('.detail-date');
            date.textContent = `${row[2]} - ${row[3]}`;

            // 위치 설정
            const location = document.querySelector('.detail-location');
            location.textContent = row[5];

            // 시간 설정
            const time = document.querySelector('.detail-time');
            time.textContent = row[6];

            // 가격 설정
            const price = document.querySelector('.detail-price');
            price.textContent = row[7];

            // 설명 설정
            const description = document.querySelector('.detail-description');
            description.textContent = row[8];

            // 아티스트 설정
            const artist = document.querySelector('.detail-artist');
            artist.textContent = row[9];
        } else {
            console.error('해당 전시 정보를 찾을 수 없습니다.');
        }
    })
    .catch(error => console.error('Error:', error));