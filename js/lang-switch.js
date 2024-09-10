const langBtn = document.querySelector('.header-lang');

langBtn.addEventListener('click', function(event) {
    event.preventDefault();
    
    // 현재 페이지 URL을 가져옵니다.
    const currentUrl = window.location.href;

    // 현재 페이지의 파일명을 추출합니다.
    const urlParts = currentUrl.split('/');
    const fileName = urlParts[urlParts.length - 1]; // 마지막 부분이 파일명입니다.

    // 파일명에서 확장자를 제외한 부분을 추출합니다.
    const fileBaseName = fileName.replace('.html', '');

    // 현재 페이지가 영어 버전인지 확인합니다.
    const isEnglish = fileBaseName.includes('--en');

    // 영어 버전인 경우, '--en'을 제거하고 한국어 버전으로 이동합니다.
    if (isEnglish) {
        const newFileName = fileBaseName.replace('--en', '') + '.html';
        window.location.href = currentUrl.replace(fileName, newFileName);
    } 
    // 한국어 버전인 경우, '--en'을 추가하여 영어 버전으로 이동합니다.
    else {
        const newFileName = fileBaseName + '--en.html';
        window.location.href = currentUrl.replace(fileName, newFileName);
    }
});