# Playing with CSS Variables and JS
## 학습 방식
1. 결과물만 본 후 css, html, js 작성
2. 완성본 보고 코드 수정해보며 비교
* 강좌는 따로 보지 않았다.

## 1. 결과물만 보고 코드 작성
1. 각 element를 id로 찾아 `addEventListener('input')`설정
2. 변경을 원하는 element를 id로 찾아 `style` 직접 변경

## 2. 완성본 보고 코드 수정해보며 비교
1. `css`
  - `:root`에 직접 변수 설정, 모든 css요소 값 변수로 설정
  - `input`에 `data-key`설정하여 단위 값 설정
2. `js`
  - `css`의 변수 값을 직접 수정하는 함수 생성 (위의 `data-key`이용하여 단위 설정)
  - `input` 엘리먼트들 `forEach`로 `addEventListener`위의 함수 일괄 설정
