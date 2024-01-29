const tabsBox = document.querySelector(".tabs-box"),
allTabs = document.querySelectorAll(".tab"),
arrowIcons = document.querySelectorAll(".icon i")

let isDragging = false;


// 방향 버튼을 누를 시 숨김처리(스크롤할게 없으면 버튼 숨김처리됨) 
const handleIcons = () =>{
    let scrollVal = Math.round(tabsBox.scrollLeft); // scrollLeft 반올림 (정확한 값이 아니면 조건문이 작동 안하는 경우가 있어서 반올림해서 해당 버그를 수정) 
    let mayScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth ;
    arrowIcons[0].parentElement.style.display = scrollVal > 0 ? "flex" :"none"
    arrowIcons[1].parentElement.style.display =  mayScrollableWidth > scrollVal ? "flex" :"none"
}

arrowIcons.forEach(icon =>{
    icon.addEventListener("click",() =>{
       // 삼항연산자를 사용해서 icon의 id 명이 left가 되면  -350px을 하고 right일 경우는 350 px 만큼 더하라도록 함
       //Element.scrollLeft속성은 요소의 콘텐츠가 왼쪽 가장자리에서 스크롤되는 픽셀 수를 가져오거나 설정
       tabsBox.scrollLeft += icon.id === "left" ? -350:350
       setTimeout(() => handleIcons(), 50); // 동작구현에 시간차를 줌
    })
})

// 선택한 tab에만 스타일 지정
allTabs.forEach(tab =>{
    tab.addEventListener("click",() =>{
    // 선택한 tab 빼고는 active 클래스명을 삭제함
    tabsBox.querySelector(".active").classList.remove("active");
    tab.classList.add("active");
    })
})

const dragging =(e)=>{
    if(!isDragging) return; // isDragging 이 false 이면 dragging 메서드 실행 X
    tabsBox.classList.add("dragging"); //  클래스명 추가 후 css 설정해줌 -> mousemove 동작이 버벅이는 현상 개선 및 mouse로 drag 할 때만 움직일 수 있도록 설정 가능
    tabsBox.scrollLeft -=  e.movementX; // 인터페이스의 읽기 movementX전용 속성은 MouseEvent지정된 이벤트와 이전 이벤트 간의 마우스 포인터 X 좌표 차이를 제공
    handleIcons();
}
const dragStop =() =>{
    isDragging = false;
    tabsBox.classList.remove("dragging"); // drag 가 멈추면 class name 삭제 
}
tabsBox.addEventListener("mousedown",() => isDragging =true); //탭에 에 mouse가 올라갈 때마다 실행 시키기 위해서 설정
tabsBox.addEventListener("mousemove",dragging);
tabsBox.addEventListener("mouseup",dragStop);

