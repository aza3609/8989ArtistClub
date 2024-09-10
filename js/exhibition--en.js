document.addEventListener('DOMContentLoaded', () => {
    const sheetId = '1_8cnbn5tTfFDJwWIIXgscWO_UjqLh_2mjdZIvB51AwY'; // Google Sheets ID
    const apiKey = 'AIzaSyCpuSDYNhxT4134m51GfNvQ3ULd4eLpH-M'; // Google API Key
    const range = 'exhibition-en!A2:E'; // 데이터 범위

    const categoryBtns = document.querySelectorAll('.category li');
    const exhibitions = document.getElementById('exhibitions');

    let exhibitionData = [];

    // Google Sheets API를 통해 전시 정보를 가져오기
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            exhibitionData = data.values;
            displayExhibitions(exhibitionData);
        })
        .catch(error => console.error('Error:', error));

    // 전시 목록을 표시하는 함수
    function displayExhibitions(exhibitionsList) {
        exhibitions.innerHTML = ''; // 기존 내용을 초기화

        exhibitionsList.forEach((row, index) => {
            const exhibitionDiv = document.createElement('a');
            exhibitionDiv.className = 'exhibition';
            exhibitionDiv.href = `detail--en.html?id=${index + 1}`;
            
            const posterDiv = document.createElement('div');
            posterDiv.classList.add('poster-wrap');

            const poster = document.createElement('img');
            poster.src = `src/exhibitions/${row[0]}`;
            poster.alt = `${row[1]} 전시 포스터`;

            const title = document.createElement('h2');
            title.textContent = row[1];

            const date = document.createElement('p');
            date.textContent = `${row[2]} - ${row[3]}`;
            
            exhibitionDiv.appendChild(posterDiv);
            posterDiv.appendChild(poster);
            exhibitionDiv.appendChild(date);
            exhibitionDiv.appendChild(title);

            exhibitions.appendChild(exhibitionDiv);
        });
    }

    // 카테고리 버튼 클릭 이벤트 설정
    categoryBtns.forEach((categoryBtn, index, array) => {
        categoryBtn.addEventListener('click', (event) => {
            event.preventDefault();
            // 모든 버튼에서 'active' 클래스를 제거
            array.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 'active' 클래스 추가
            categoryBtn.classList.add('active');

            if (index === 1) { // 두 번째 버튼을 눌렀을 때
                const filteredExhibitions = exhibitionData.filter(row => row[4] === '진행중인 전시');
                displayExhibitions(filteredExhibitions);
            } 
            else if(index === 2){
                const filteredExhibitions = exhibitionData.filter(row => row[4] === '예정된 전시');
                displayExhibitions(filteredExhibitions);
            }
            else if(index === 3){
                const filteredExhibitions = exhibitionData.filter(row => row[4] === '지난 전시');
                displayExhibitions(filteredExhibitions);
            }
            else {
                // 첫 번째 버튼을 눌렀을 때 모든 전시를 표시
                displayExhibitions(exhibitionData);
            }
        });
    });
});
