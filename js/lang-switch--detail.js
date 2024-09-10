const langBtn = document.querySelector('.header-lang');

langBtn.addEventListener('click', function(event) {
    event.preventDefault();
    
    // 현재 페이지의 URL을 가져옵니다.
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    // 쿼리 파라미터를 추출합니다.
    const queryParams = url.search; // ?id=1 형태로 저장됩니다.

    // 현재 파일명과 확장자를 추출합니다.
    const fileName = url.pathname.split('/').pop();
    const fileBaseName = fileName.replace('.html', '');

    // 언어 버전에 따라 새로운 파일명을 결정합니다.
    let newFileBaseName;
    if (fileBaseName.includes('--en')) {
        // '--en'이 파일명에 포함되어 있으면 제거
        newFileBaseName = fileBaseName.replace('--en', '');
    } else {
        // '--en'이 파일명에 포함되어 있지 않으면 추가
        newFileBaseName = fileBaseName + '--en';
    }
    const newFileName = newFileBaseName + '.html';

    // 새 URL을 생성합니다.
    const newUrl = url.origin + url.pathname.replace(fileName, newFileName) + queryParams;

    // 새 URL로 이동합니다.
    window.location.href = newUrl;
});
