const sheetId = '1_8cnbn5tTfFDJwWIIXgscWO_UjqLh_2mjdZIvB51AwY'; // Google Sheets ID
const apiKey = 'AIzaSyCpuSDYNhxT4134m51GfNvQ3ULd4eLpH-M'; // Google API Key
const range = 'exhibition-kr!A2:D'; // 데이터 범위

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
.then(response => response.json())
.then(data => {
    const exhibitions = document.getElementById('exhibitions--main');

    data.values.forEach((row, index) => {
        const exhibitionDiv = document.createElement('a');
        exhibitionDiv.className = 'exhibition';
        exhibitionDiv.href = `detail.html?id=${index + 1}`;

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
})
.catch(error => console.error('Error:', error));




const exhibitionsMain = document.getElementById('exhibitions--main');

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

document.getElementById('exhibition-slide-left').addEventListener('click', () => {
    document.getElementById('exhibitions--main').scrollLeft -= 430; // 왼쪽으로 200px 이동
});

document.getElementById('exhibition-slide-right').addEventListener('click', () => {
    document.getElementById('exhibitions--main').scrollLeft += 430; // 오른쪽으로 200px 이동
});
