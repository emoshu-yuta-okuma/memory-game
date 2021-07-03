const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        // 一枚目のクリック
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // 2枚目のクリック
    secondCard = this;

    checkForMatch();
}

const checkForMatch = () => {
    // 1枚目と2枚目のカードが揃ったかどうか
    let isMatch = firstCard.dataset.img === secondCard.dataset.img;

    // true: 1枚目と2枚目が揃っている状態 -> クリックイベント取り除く
    // false: 1枚目と2枚目のカードが違った状態 -> カードをひっくり返して戻す
    isMatch ? disableCards() : unflipCards();
}

const disableCards = () => {
    // クリックイベント取り除く
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

const unflipCards = () => {
    lockBoard = true;

    // setTimeoutでひっくり返すまでの時間を指定 
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// ゲームのリセット
const resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// カードシャッフル
const shuffle = (() => {
    cards.forEach(card => {
        // 0〜17のランダムな数字を生成
        let randomPos = Math.floor(Math.random() * 18);
        card.style.order = randomPos;
    });
})();

// カードのクリックイベント
cards.forEach(card => card.addEventListener('click', flipCard));