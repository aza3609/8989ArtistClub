/* ------- 버튼 클릭 슬라이드 -------*/
const storeGoodsMain = document.getElementById('store-goods--main');

document.getElementById('store-slide-left').addEventListener('click', () => {
    storeGoodsMain.scrollLeft -= storeGoodsMain.scrollWidth * 0.15; // 왼쪽으로 20% 이동
});

document.getElementById('store-slide-right').addEventListener('click', () => {
    storeGoodsMain.scrollLeft += storeGoodsMain.scrollWidth * 0.15; // 오른쪽으로 20% 이동
});

const exhibitionsMain = document.getElementById('exhibitions--main');

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

document.getElementById('exhibition-slide-left').addEventListener('click', () => {
    document.getElementById('exhibitions--main').scrollLeft -= 430; // 왼쪽으로 200px 이동
});

document.getElementById('exhibition-slide-right').addEventListener('click', () => {
    document.getElementById('exhibitions--main').scrollLeft += 430; // 오른쪽으로 200px 이동
});


/* ------- 버튼 투명도 -------*/

const storeWrap = document.querySelector('.main-store-wrap');
const storebuttons = document.querySelectorAll('.main-store button'); // 슬라이드 버튼들

// 두 버튼을 동시에 보이게 하기
function showButtons() {
    storebuttons.forEach(storebutton => {
        storebutton.style.opacity = '1'; // 마우스가 올라가면 두 버튼 보이기
    });
}

// 두 버튼을 동시에 숨기기
function hideButtons() {
    storebuttons.forEach(storebutton => {
        storebutton.style.opacity = '0'; // 마우스가 떠나면 두 버튼 숨기기
    });
}

// .main-store-wrap에 마우스오버 시 두 버튼 보이기
storeWrap.addEventListener('mouseenter', () => {
    showButtons();
});

// .main-store-wrap에서 마우스가 벗어났을 때 두 버튼 숨기기
storeWrap.addEventListener('mouseleave', (event) => {
    // 버튼 위에 마우스가 있을 때는 숨기지 않도록 조건 추가
    if (!event.relatedTarget || !storeWrap.contains(event.relatedTarget)) {
        hideButtons();
    }
});

// 버튼에 마우스오버 시에도 투명도 유지 (개별 버튼에서 처리할 필요 없음)
storebuttons.forEach(storebutton => {
    storebutton.addEventListener('mouseenter', () => {
        showButtons(); // 마우스가 버튼 위에 있으면 두 버튼 모두 투명도 유지
    });
    storebutton.addEventListener('mouseleave', (event) => {
        // 버튼에서 마우스가 벗어나더라도 여전히 .main-store-wrap 내에 있으면 숨기지 않음
        if (!event.relatedTarget || !storeWrap.contains(event.relatedTarget)) {
            hideButtons();
        }
    });
});

const exhibitionWrap = document.querySelector('.main-exhibition-wrap');
const exhibitionbuttons = document.querySelectorAll('.main-exhibition button'); // 슬라이드 버튼들

// 두 버튼을 동시에 보이게 하기
function showButtons2() {
    exhibitionbuttons.forEach(exhibitionbutton => {
        exhibitionbutton.style.opacity = '1'; // 마우스가 올라가면 두 버튼 보이기
    });
}

// 두 버튼을 동시에 숨기기
function hideButtons2() {
    exhibitionbuttons.forEach(exhibitionbutton => {
        exhibitionbutton.style.opacity = '0'; // 마우스가 떠나면 두 버튼 숨기기
    });
}

// .main-store-wrap에 마우스오버 시 두 버튼 보이기
exhibitionWrap.addEventListener('mouseenter', () => {
    showButtons2();
});

// .main-store-wrap에서 마우스가 벗어났을 때 두 버튼 숨기기
exhibitionWrap.addEventListener('mouseleave', (event) => {
    // 버튼 위에 마우스가 있을 때는 숨기지 않도록 조건 추가
    if (!event.relatedTarget || !exhibitionWrap.contains(event.relatedTarget)) {
        hideButtons2();
    }
});

// 버튼에 마우스오버 시에도 투명도 유지 (개별 버튼에서 처리할 필요 없음)
exhibitionbuttons.forEach(exhibitionbutton => {
    exhibitionbutton.addEventListener('mouseenter', () => {
        showButtons2(); // 마우스가 버튼 위에 있으면 두 버튼 모두 투명도 유지
    });
    exhibitionbutton.addEventListener('mouseleave', (event) => {
        // 버튼에서 마우스가 벗어나더라도 여전히 .main-store-wrap 내에 있으면 숨기지 않음
        if (!event.relatedTarget || !exhibitionWrap.contains(event.relatedTarget)) {
            hideButtons2();
        }
    });
});
