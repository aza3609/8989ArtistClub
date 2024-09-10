document.addEventListener('DOMContentLoaded', () => {
    const reviewsMain = document.getElementById('reviews--main');

    // 로컬 스토리지에서 리뷰 가져오기
    function getReviews() {
        const reviews = [];
        for (let key in localStorage) {
            if (key.startsWith('reviews_')) {
                reviews.push(...JSON.parse(localStorage.getItem(key)));
            }
        }
        return reviews;
    }

    // 최근 리뷰 5개 로드하여 표시
    function loadRecentReviews() {
        const reviews = getReviews().sort((a, b) => b.id - a.id).slice(0, 5); // 최신순으로 정렬 후 상위 5개

        reviewsMain.innerHTML = ''; // 기존 내용 초기화

        
        reviews.forEach(review => {

            console.log(`Exhibition ID: ${review.exhibitionId}`); // 전시 ID 출력
            const reviewDiv = document.createElement('a');
            reviewDiv.className = 'review';
            reviewDiv.href = `detail--en.html?id=${review.exhibitionId}`; // 전시 ID를 URL 파라미터로 추가
            reviewDiv.innerHTML = `
                <strong>관람객: ${review.nickname}</strong>
                <p class="content">${review.review}</p>
                <p class="date">${review.date}</p>
            `;
            reviewsMain.appendChild(reviewDiv);
        });
    }

    loadRecentReviews(); // 페이지 로드 시 최근 리뷰 5개 로드
});

