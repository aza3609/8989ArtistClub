document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const reviewsContainer = document.getElementById('reviews');
    let currentColumnIndex = 0; // 현재 컬럼 인덱스 추적
    
    // 현재 전시 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const exhibitionId = urlParams.get('id');

    if (!exhibitionId) {
        console.error('Exhibition ID not found in URL parameters.');
        return;
    }

    // 마스터 비밀번호 설정 ( 비밀번호)
    const masterPassword = '0000';

    // 기존 리뷰를 로컬 스토리지에서 불러오기
    loadReviews();
    
    // 리뷰 제출 처리
    submitBtn.addEventListener('click', () => {
        const nickname = document.getElementById('nickname').value.trim();
        const reviewText = document.getElementById('review').value.trim();
        const password = document.getElementById('password').value.trim();

        // 입력 필드 유효성 검사
        if (!nickname || !reviewText || password.length !== 4) {
            alert('모든 필드를 올바르게 입력하세요.');
            return;
        }

        const reviews = getReviews(exhibitionId);
        const reviewId = Date.now(); // 타임스탬프 기반의 고유 ID 생성
        const currentDate = new Date().toLocaleDateString(); // 현재 날짜를 yyyy-mm-dd 형식으로 가져오기

        reviews.push({ id: reviewId, exhibitionId, nickname, review: reviewText, password, date: currentDate });
        saveReviews(exhibitionId, reviews);

        // 폼 초기화
        document.getElementById('nickname').value = '';
        document.getElementById('review').value = '';
        document.getElementById('password').value = '';

        loadReviews();
    });

    feather.replace();

    // 로컬 스토리지에서 리뷰 불러오기
    function loadReviews() {
        const columns = document.querySelectorAll('.reviews_column');
        columns.forEach(column => column.innerHTML = ''); // 기존 리뷰 초기화

        currentColumnIndex = 0; // 컬럼 인덱스 초기화

        const reviews = getReviews(exhibitionId);
        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review';
            reviewDiv.innerHTML = `
                <strong>관람객: ${review.nickname}</strong>
                <p class="content">${review.review}</p>
                <div class="review-bottom"><p class="date">${review.date}</p><button class="delete-btn" data-id="${review.id}"><i data-feather="x"></i>삭제</button></div>       
            `;
            
            // 현재 컬럼에 리뷰 추가
            columns[currentColumnIndex].appendChild(reviewDiv);
            
            // 다음 컬럼 인덱스로 업데이트
            currentColumnIndex = (currentColumnIndex + 1) % columns.length;
        });

        // 삭제 이벤트 리스너 추가
        attachDeleteEventListeners();
    }

    feather.replace();

    function attachDeleteEventListeners() {
        const deleteBtns = document.querySelectorAll('.delete-btn');

        deleteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const reviewId = btn.dataset.id;
                const enteredPassword = prompt('비밀번호를 입력하세요:');

                if (enteredPassword === null) return; // 사용자가 취소함

                const reviews = getReviews(exhibitionId);
                const reviewToDelete = reviews.find(review => review.id === parseInt(reviewId, 10));
                
                // 입력한 비밀번호가 리뷰 비밀번호 또는 마스터 비밀번호와 일치하는지 확인
                if (enteredPassword === reviewToDelete.password || enteredPassword === masterPassword) {
                    const updatedReviews = reviews.filter(review =>
                        review.id !== parseInt(reviewId, 10)
                    );
                    saveReviews(exhibitionId, updatedReviews);
                    loadReviews();
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            });
        });
    }

    function getReviews(exhibitionId) {
        const reviews = localStorage.getItem(`reviews_${exhibitionId}`);
        return reviews ? JSON.parse(reviews) : [];
    }

    function saveReviews(exhibitionId, reviews) {
        localStorage.setItem(`reviews_${exhibitionId}`, JSON.stringify(reviews));
    }
});